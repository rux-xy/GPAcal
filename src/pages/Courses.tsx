import { useState } from "react";
import CourseTable from "../components/CourseTable";
import { type Course, calculateGPA } from "../utils/gpaCalculator";

/* ---------------- TYPES ---------------- */

type SubjectFilter = "ALL" | "COSC" | "STAT" | "PMAT";

/* ---------------- COMPONENT ---------------- */

function Courses({
  courses,
  onAddCourse,
  onDeleteCourse,
  onUpdateCourse,
}: {
  courses: Course[];
  onAddCourse: (course: Course) => void;
  onDeleteCourse: (code: string) => void;
  onUpdateCourse: (course: Course) => void;
}) {
  /* ---------- STATE ---------- */

  const [selectedSubject, setSelectedSubject] = useState<SubjectFilter>("ALL");

  /* ---------- DERIVED DATA ---------- */

  // Filter courses by subject
  const filteredCourses =
    selectedSubject === "ALL"
      ? courses
      : courses.filter((course) => course.subject === selectedSubject);

  // Overall GPA
  const overallGPA = calculateGPA(filteredCourses);

  // Group courses by semester
  const coursesBySemester = filteredCourses.reduce((acc, course) => {
    if (!acc[course.semester]) {
      acc[course.semester] = [];
    }
    acc[course.semester].push(course);
    return acc;
  }, {} as Record<number, Course[]>);

  // Calculate GPA for a single semester
  function calculateSemesterGPA(semester: number) {
    return calculateGPA(coursesBySemester[semester] || []);
  }

  /* ---------- UI ---------- */

  return (
    <div className="p-6 space-y-6">
      {/* PAGE TITLE */}
      <h1 className="text-2xl font-bold">Courses</h1>

      {/* SUBJECT FILTER CARD */}
      <div className="border rounded-lg p-4 max-w-sm">
        <p className="text-sm text-gray-500 mb-2">Filter by Subject</p>

        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value as SubjectFilter)}
          className="w-full border p-2 rounded"
        >
          <option value="ALL">All Subjects</option>
          <option value="COSC">Computer Science (COSC)</option>
          <option value="STAT">Statistics (STAT)</option>
          <option value="PMAT">Pure Mathematics (PMAT)</option>
        </select>
      </div>

      {/* OVERALL GPA CARD */}
      <div className="border rounded-lg p-4 max-w-sm">
        <p className="text-sm text-gray-500">Calculated GPA</p>
        <p className="text-3xl font-bold">{overallGPA}</p>
      </div>

      {/* SEMESTER SECTIONS */}
      <div className="space-y-8">
        {Object.keys(coursesBySemester).map((semester) => {
          const sem = Number(semester);

          return (
            <div key={semester} className="space-y-3">
              <h2 className="text-lg font-semibold">Semester {semester}</h2>

              {/* SEMESTER GPA */}
              <div className="border rounded-lg p-3 max-w-xs bg-gray-50">
                <p className="text-xs text-gray-500">Semester GPA</p>
                <p className="text-2xl font-bold">
                  {calculateSemesterGPA(sem)}
                </p>
              </div>

              {/* COURSE TABLE */}
              <CourseTable
                courses={coursesBySemester[sem]}
                semester={sem}
                onAddCourse={onAddCourse}
                onDeleteCourse={onDeleteCourse}
                onUpdateCourse={onUpdateCourse}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Courses;
