import type { Course } from "../utils/gpaCalculator";
import { calculateGPA } from "../utils/gpaCalculator";

type AnalysisProps = {
  courses: Course[];
};

function Analysis({ courses }: AnalysisProps) {
  /* ---------------- EMPTY STATE ---------------- */

  if (courses.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-2">Analysis</h1>
        <p className="text-gray-500">
          No course data available yet. Add courses to see analysis.
        </p>
      </div>
    );
  }

  /* ---------------- BASIC CALCULATIONS ---------------- */

  const overallGPA = calculateGPA(courses);

  /* ---------------- GROUP BY SEMESTER ---------------- */

  const semesterMap = courses.reduce((acc, course) => {
    acc[course.semester] = acc[course.semester] || [];
    acc[course.semester].push(course);
    return acc;
  }, {} as Record<number, Course[]>);

  const semesterGPAs = Object.entries(semesterMap).map(([semester, list]) => ({
    semester: Number(semester),
    gpa: calculateGPA(list),
  }));

  /* ---------------- GROUP BY SUBJECT ---------------- */

  const subjectMap = courses.reduce((acc, course) => {
    acc[course.subject] = acc[course.subject] || [];
    acc[course.subject].push(course);
    return acc;
  }, {} as Record<string, Course[]>);

  const subjectStats = Object.entries(subjectMap).map(([subject, list]) => ({
    subject,
    gpa: calculateGPA(list),
    count: list.length,
  }));

  /* ---------------- SAFE BEST / WORST ---------------- */

  const bestSemester =
    semesterGPAs.length > 0
      ? semesterGPAs.reduce((a, b) => (b.gpa > a.gpa ? b : a))
      : null;

  const weakestSemester =
    semesterGPAs.length > 0
      ? semesterGPAs.reduce((a, b) => (b.gpa < a.gpa ? b : a))
      : null;

  const bestSubject =
    subjectStats.length > 0
      ? subjectStats.reduce((a, b) => (b.gpa > a.gpa ? b : a))
      : null;

  /* ---------------- UI ---------------- */

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Analysis</h1>

      {/* OVERALL GPA */}
      <div className="border rounded-lg p-4 max-w-sm">
        <p className="text-sm text-gray-500">Overall GPA</p>
        <p className="text-3xl font-bold">{overallGPA}</p>
      </div>

      {/* SEMESTER ANALYSIS */}
      {bestSemester && weakestSemester && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4">
            <p className="text-sm text-gray-500">Strongest Semester</p>
            <p className="text-xl font-semibold">
              Semester {bestSemester.semester}
            </p>
            <p className="text-green-600 font-bold">GPA {bestSemester.gpa}</p>
          </div>

          <div className="border rounded-lg p-4">
            <p className="text-sm text-gray-500">Weakest Semester</p>
            <p className="text-xl font-semibold">
              Semester {weakestSemester.semester}
            </p>
            <p className="text-red-600 font-bold">GPA {weakestSemester.gpa}</p>
          </div>
        </div>
      )}

      {/* SUBJECT ANALYSIS */}
      {bestSubject && (
        <div className="border rounded-lg p-4">
          <p className="text-sm text-gray-500 mb-2">Best Performing Subject</p>

          <p className="text-xl font-semibold">{bestSubject.subject}</p>

          <p className="text-green-600 font-bold">GPA {bestSubject.gpa}</p>

          <p className="text-xs text-gray-400">
            Based on {bestSubject.count} course(s)
          </p>
        </div>
      )}

      {/* SUBJECT BREAKDOWN */}
      {subjectStats.length > 0 && (
        <div className="border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left">Subject</th>
                <th className="p-3 text-center">Courses</th>
                <th className="p-3 text-center">Average GPA</th>
              </tr>
            </thead>
            <tbody>
              {subjectStats.map((s) => (
                <tr key={s.subject} className="border-t">
                  <td className="p-3">{s.subject}</td>
                  <td className="p-3 text-center">{s.count}</td>
                  <td className="p-3 text-center font-semibold">{s.gpa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Analysis;
