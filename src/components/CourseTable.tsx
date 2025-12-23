import { useState } from "react";
import type { Course } from "../utils/gpaCalculator";

type CourseTableProps = {
  courses: Course[];
  semester: number;
  onAddCourse: (course: Course) => void;
};

function CourseTable({ courses, semester, onAddCourse }: CourseTableProps) {
  const [newCourse, setNewCourse] = useState<Course>({
    code: "",
    name: "",
    credits: 0,
    grade: "",
    semester,
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    setNewCourse({
      ...newCourse,
      [name]: name === "credits" ? Number(value) : value,
    });
  }

  function handleAdd() {
    if (
      !newCourse.code ||
      !newCourse.name ||
      newCourse.credits <= 0 ||
      !newCourse.grade
    ) {
      return;
    }

    onAddCourse(newCourse);

    setNewCourse({
      code: "",
      name: "",
      credits: 0,
      grade: "",
      semester,
    });
  }

  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 text-left">Code</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-center">Credits</th>
            <th className="p-3 text-center">Grade</th>
            <th className="p-3"></th>
          </tr>
        </thead>

        <tbody>
          {courses.map((course) => (
            <tr key={course.code} className="border-t">
              <td className="p-3">{course.code}</td>
              <td className="p-3">{course.name}</td>
              <td className="p-3 text-center">{course.credits}</td>
              <td className="p-3 text-center">{course.grade}</td>
              <td className="p-3"></td>
            </tr>
          ))}

          {/* Input row */}
          <tr className="border-t bg-gray-50">
            <td className="p-2">
              <input
                name="code"
                value={newCourse.code}
                onChange={handleChange}
                placeholder="Code"
                className="w-full border p-1 rounded"
              />
            </td>

            <td className="p-2">
              <input
                name="name"
                value={newCourse.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full border p-1 rounded"
              />
            </td>

            <td className="p-2">
              <input
                type="number"
                name="credits"
                value={newCourse.credits || ""}
                onChange={handleChange}
                placeholder="Credits"
                className="w-full border p-1 rounded text-center"
              />
            </td>

            <td className="p-2">
              <select
                name="grade"
                value={newCourse.grade}
                onChange={handleChange}
                className="w-full border p-1 rounded text-center"
              >
                <option value="">Grade</option>
                <option>A+</option>
                <option>A</option>
                <option>A-</option>
                <option>B+</option>
                <option>B</option>
                <option>B-</option>
                <option>C+</option>
                <option>C</option>
                <option>C-</option>
                <option>D</option>
                <option>F</option>
              </select>
            </td>

            <td className="p-2 text-center">
              <button
                onClick={handleAdd}
                className="bg-blue-600 text-white px-3 py-1 rounded text-xs hover:bg-blue-700"
              >
                Add
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CourseTable;
