import { useState } from "react";
import CourseTable from "../components/CourseTable";
import { type Course, calculateGPA } from "../utils/gpaCalculator";

function Courses() {
  const [courses, setCourses] = useState<Course[]>([
    {
      code: "COSC101",
      name: "Programming I",
      credits: 3,
      grade: "A-",
      semester: 1,
    },
    {
      code: "STAT102",
      name: "Statistics I",
      credits: 3,
      grade: "B+",
      semester: 1,
    },
    {
      code: "COSC201",
      name: "Data Structures",
      credits: 3,
      grade: "A",
      semester: 2,
    },
  ]);

  const gpa = calculateGPA(courses);

  const coursesBySemester = courses.reduce((acc, course) => {
    if (!acc[course.semester]) {
      acc[course.semester] = [];
    }
    acc[course.semester].push(course);
    return acc;
  }, {} as Record<number, Course[]>);

  function handleAddCourse(course: Course) {
    setCourses((prev) => [...prev, course]);
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Courses</h1>

      <div className="border rounded-lg p-4 max-w-sm">
        <p className="text-sm text-gray-500">Calculated GPA</p>
        <p className="text-3xl font-bold">{gpa}</p>
      </div>

      <div className="space-y-6">
        {Object.keys(coursesBySemester).map((semester) => (
          <div key={semester} className="space-y-2">
            <h2 className="text-lg font-semibold">Semester {semester}</h2>

            <CourseTable
              courses={coursesBySemester[Number(semester)]}
              semester={Number(semester)}
              onAddCourse={handleAddCourse}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Courses;
