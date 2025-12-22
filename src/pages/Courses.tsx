import { useState } from "react";
import CourseTable from "../components/CourseTable";
import { type Course, calculateGPA } from "../utils/gpaCalculator";

function Courses() {
  const [newCourse, setNewCourse] = useState<Course>({
    code: "",
    name: "",
    credits: 0,
    grade: 0,
  });

  function addCourse() {
    if (!newCourse.code || !newCourse.name || newCourse.credits <= 0) {
      return;
    }

    setCourses([...courses, newCourse]);

    setNewCourse({
      code: "",
      name: "",
      credits: 0,
      grade: 0,
    });
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setNewCourse({
      ...newCourse,
      [name]: name === "credits" || name === "grade" ? Number(value) : value,
    });
  }

  const [courses, setCourses] = useState<Course[]>([
    {
      code: "COSC101",
      name: "Programming I",
      credits: 3,
      grade: 3.7,
    },
    {
      code: "STAT102",
      name: "Statistics I",
      credits: 3,
      grade: 3.2,
    },
  ]);

  const gpa = calculateGPA(courses);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Courses</h1>

      <div className="border rounded-lg p-4 max-w-sm">
        <p className="text-sm text-gray-500">Calculated GPA</p>
        <p className="text-3xl font-bold">{gpa}</p>
      </div>

      <div className="border rounded-lg p-4 space-y-4 max-w-xl">
        <h2 className="font-semibold">Add New Course</h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="text"
            name="code"
            placeholder="Course Code"
            value={newCourse.code}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />

          <input
            type="text"
            name="name"
            placeholder="Course Name"
            value={newCourse.name}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />

          <input
            type="number"
            name="credits"
            placeholder="Credits"
            value={newCourse.credits || ""}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />

          <input
            type="number"
            step="0.1"
            name="grade"
            placeholder="Grade (0–4)"
            value={newCourse.grade || ""}
            onChange={handleInputChange}
            className="border p-2 rounded"
          />
        </div>

        <button
          onClick={addCourse}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Course
        </button>
      </div>

      <CourseTable courses={courses} />
    </div>
  );
}

export default Courses;
