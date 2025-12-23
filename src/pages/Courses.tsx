import { useState } from "react";
import CourseTable from "../components/CourseTable";
import { type Course, calculateGPA } from "../utils/gpaCalculator";

/* ---------------- TYPES ---------------- */

type SubjectFilter = "ALL" | "COSC" | "STAT" | "PMAT";

/* ---------------- CONSTANTS ---------------- */

// You can expand this later (Year 1–4 etc.)
const SEMESTERS = [1, 2];

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

  /* ---------- FILTERED COURSES ---------- */

  const filteredCourses =
    selectedSubject === "ALL"
      ? courses
      : courses.filter((c) => c.subject === selectedSubject);

  /* ---------- GPA ---------- */

  const overallGPA = calculateGPA(filteredCourses);

  function calculateSemesterGPA(semester: number) {
    const semesterCourses = filteredCourses.filter(
      (c) => c.semester === semester
    );
    return calculateGPA(semesterCourses);
  }

  /* ---------- UI ---------- */

  return (
    <div className="p-6 space-y-6">
      {/* TITLE */}
      <h1 className="text-2xl font-bold">Courses</h1>

      {/* SUBJECT FILTER */}
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

      {/* OVERALL GPA */}
      <div className="border rounded-lg p-4 max-w-sm">
        <p className="text-sm text-gray-500">Calculated GPA</p>
        <p className="text-3xl font-bold">{overallGPA}</p>
      </div>

      {/* SEMESTERS (ALWAYS RENDERED) */}
      <div className="space-y-8">
        {SEMESTERS.map((semester) => {
          const semesterCourses = filteredCourses.filter(
            (c) => c.semester === semester
          );

          return (
            <div key={semester} className="space-y-3">
              <h2 className="text-lg font-semibold">Semester {semester}</h2>

              {/* SEMESTER GPA */}
              <div className="border rounded-lg p-3 max-w-xs bg-gray-50">
                <p className="text-xs text-gray-500">Semester GPA</p>
                <p className="text-2xl font-bold">
                  {calculateSemesterGPA(semester)}
                </p>
              </div>

              {/* COURSE TABLE (ALWAYS SHOWN) */}
              <CourseTable
                courses={semesterCourses}
                semester={semester}
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
