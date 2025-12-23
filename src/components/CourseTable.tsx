import { useState } from "react";
import type { Course } from "../utils/gpaCalculator";
import { Plus, Pencil, Trash2, Save, X } from "lucide-react";

type CourseTableProps = {
  courses: Course[];
  semester: number;
  onAddCourse: (course: Course) => void;
  onDeleteCourse: (code: string) => void;
  onUpdateCourse: (course: Course) => void;
};

function CourseTable({
  courses,
  semester,
  onAddCourse,
  onDeleteCourse,
  onUpdateCourse,
}: CourseTableProps) {
  /* ---------------- Add course state ---------------- */
  const [newCourse, setNewCourse] = useState<Course>({
    code: "",
    name: "",
    credits: 0,
    grade: "",
    semester,
  });

  /* ---------------- Edit course state ---------------- */
  const [editingCode, setEditingCode] = useState<string | null>(null);
  const [editCourse, setEditCourse] = useState<Course | null>(null);

  /* ---------------- Add handlers ---------------- */
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

  /* ---------------- Edit handlers ---------------- */
  function startEdit(course: Course) {
    setEditingCode(course.code);
    setEditCourse({ ...course });
  }

  function handleEditChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    if (!editCourse) return;

    const { name, value } = e.target;

    setEditCourse({
      ...editCourse,
      [name]: name === "credits" ? Number(value) : value,
    });
  }

  function saveEdit() {
    if (!editCourse) return;

    onUpdateCourse(editCourse);
    setEditingCode(null);
    setEditCourse(null);
  }

  function cancelEdit() {
    setEditingCode(null);
    setEditCourse(null);
  }

  /* ---------------- UI ---------------- */
  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 text-left">Code</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-center">Credits</th>
            <th className="p-3 text-center">Grade</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {/* Existing courses */}
          {courses.map((course) =>
            editingCode === course.code && editCourse ? (
              /* -------- EDIT MODE -------- */
              <tr key={course.code} className="border-t bg-yellow-50">
                <td className="p-2">{course.code}</td>

                <td className="p-2">
                  <input
                    name="name"
                    value={editCourse.name}
                    onChange={handleEditChange}
                    className="w-full border p-1 rounded"
                  />
                </td>

                <td className="p-2">
                  <input
                    type="number"
                    name="credits"
                    value={editCourse.credits}
                    onChange={handleEditChange}
                    className="w-full border p-1 rounded text-center"
                  />
                </td>

                <td className="p-2">
                  <select
                    name="grade"
                    value={editCourse.grade}
                    onChange={handleEditChange}
                    className="w-full border p-1 rounded text-center"
                  >
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

                <td className="p-2 text-center space-x-2">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={saveEdit}
                      className="text-green-600 hover:text-green-800"
                      title="Save"
                    >
                      <Save size={16} />
                    </button>

                    <button
                      onClick={cancelEdit}
                      className="text-gray-500 hover:text-gray-700"
                      title="Cancel"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ) : (
              /* -------- VIEW MODE -------- */
              <tr key={course.code} className="border-t">
                <td className="p-3">{course.code}</td>
                <td className="p-3">{course.name}</td>
                <td className="p-3 text-center">{course.credits}</td>
                <td className="p-3 text-center">{course.grade}</td>
                <td className="p-3 text-center space-x-2">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => startEdit(course)}
                      className="text-blue-600 hover:text-blue-800"
                      title="Edit"
                    >
                      <Pencil size={16} />
                    </button>

                    <button
                      onClick={() => onDeleteCourse(course.code)}
                      className="text-red-600 hover:text-red-800"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            )
          )}

          {/* -------- ADD ROW -------- */}
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
                className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                title="Add course"
              >
                <Plus size={16} />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CourseTable;
