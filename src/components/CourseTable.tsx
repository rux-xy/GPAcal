import { useState } from "react";
import type { Course } from "../utils/gpaCalculator";
import { Pencil, Trash2, Plus } from "lucide-react";
import { parseSubjectFromCode } from "../utils/courseParser";

/* ---------------- PROPS ---------------- */

type CourseTableProps = {
  courses: Course[];
  semester: number;
  onAddCourse: (course: Course) => void;
  onDeleteCourse: (code: string) => void;
  onUpdateCourse: (course: Course) => void;
};

/* ---------------- COMPONENT ---------------- */

function CourseTable({
  courses,
  semester,
  onAddCourse,
  onDeleteCourse,
  onUpdateCourse,
}: CourseTableProps) {
  /* ---------- ADD COURSE STATE ---------- */

  const [newCourse, setNewCourse] = useState<Course>({
    code: "",
    name: "",
    credits: 0,
    grade: "",
    semester,
    subject: "UNKNOWN",
    level: 1,
  });

  /* ---------- EDIT COURSE STATE ---------- */

  const [editingCode, setEditingCode] = useState<string | null>(null);
  const [editCourse, setEditCourse] = useState<Course | null>(null);

  /* ---------- HANDLERS ---------- */

  function handleNewChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    setNewCourse((prev) => {
      const updated: Course = {
        ...prev,
        [name]: name === "credits" ? Number(value) : value,
      } as Course;

      if (name === "code") {
        updated.subject = parseSubjectFromCode(value);
      }

      return updated;
    });
  }

  function handleEditChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    if (!editCourse) return;

    const { name, value } = e.target;

    setEditCourse((prev) => {
      if (!prev) return prev;

      const updated: Course = {
        ...prev,
        [name]: name === "credits" ? Number(value) : value,
      } as Course;

      if (name === "code") {
        updated.subject = parseSubjectFromCode(value);
      }

      return updated;
    });
  }

  function addCourse() {
    if (
      !newCourse.code ||
      !newCourse.name ||
      newCourse.credits <= 0 ||
      !newCourse.grade
    )
      return;

    onAddCourse(newCourse);

    setNewCourse({
      code: "",
      name: "",
      credits: 0,
      grade: "",
      semester,
      subject: "UNKNOWN",
      level: 1,
    });
  }

  function startEdit(course: Course) {
    setEditingCode(course.code);
    setEditCourse({ ...course });
  }

  function saveEdit() {
    if (!editCourse) return;
    onUpdateCourse(editCourse);
    cancelEdit();
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
          {/* EXISTING COURSES */}
          {courses.map((course) =>
            editingCode === course.code && editCourse ? (
              <tr key={course.code} className="bg-yellow-50 border-t">
                <td className="p-2">{course.code}</td>

                <td className="p-2">
                  <input
                    name="name"
                    value={editCourse.name}
                    onChange={handleEditChange}
                    className="border p-1 rounded w-full"
                  />
                </td>

                <td className="p-2 text-center">
                  <input
                    type="number"
                    name="credits"
                    value={editCourse.credits}
                    onChange={handleEditChange}
                    className="border p-1 rounded w-20 text-center"
                  />
                </td>

                <td className="p-2 text-center">
                  <select
                    name="grade"
                    value={editCourse.grade}
                    onChange={handleEditChange}
                    className="border p-1 rounded"
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

                <td className="p-2 text-center space-x-2">
                  <button onClick={saveEdit} className="text-green-600 text-xs">
                    Save
                  </button>
                  <button
                    onClick={cancelEdit}
                    className="text-gray-500 text-xs"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            ) : (
              <tr key={course.code} className="border-t">
                <td className="p-3">{course.code}</td>
                <td className="p-3">{course.name}</td>
                <td className="p-3 text-center">{course.credits}</td>
                <td className="p-3 text-center">{course.grade}</td>
                <td className="p-3 text-center space-x-3">
                  <button
                    onClick={() => startEdit(course)}
                    className="text-blue-600"
                  >
                    <Pencil size={14} />
                  </button>

                  <button
                    onClick={() => onDeleteCourse(course.code)}
                    className="text-red-600"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            )
          )}

          {/* ADD COURSE ROW */}
          <tr className="border-t bg-gray-50">
            <td className="p-2">
              <input
                name="code"
                value={newCourse.code}
                onChange={handleNewChange}
                placeholder="Code (e.g. STAT32652)"
                className="border p-1 rounded w-full"
              />
            </td>

            <td className="p-2">
              <input
                name="name"
                value={newCourse.name}
                onChange={handleNewChange}
                placeholder="Name"
                className="border p-1 rounded w-full"
              />
            </td>

            <td className="p-2">
              <input
                type="number"
                name="credits"
                value={newCourse.credits || ""}
                onChange={handleNewChange}
                placeholder="Credits"
                className="border p-1 rounded w-full text-center"
              />
            </td>

            <td className="p-2">
              <select
                name="grade"
                value={newCourse.grade}
                onChange={handleNewChange}
                className="border p-1 rounded w-full"
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
              <button onClick={addCourse} className="text-green-600">
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
