import type { Course } from "../utils/gpaCalculator";

type CourseTableProps = {
  courses: Course[];
};

function CourseTable({ courses }: CourseTableProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 text-left">Code</th>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-center">Credits</th>
            <th className="p-3 text-center">Grade</th>
          </tr>
        </thead>

        <tbody>
          {courses.length === 0 ? (
            <tr>
              <td colSpan={4} className="p-4 text-center text-gray-500">
                No courses added yet
              </td>
            </tr>
          ) : (
            courses.map((course) => (
              <tr key={course.code} className="border-t">
                <td className="p-3">{course.code}</td>
                <td className="p-3">{course.name}</td>
                <td className="p-3 text-center">{course.credits}</td>
                <td className="p-3 text-center">{course.grade}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CourseTable;
