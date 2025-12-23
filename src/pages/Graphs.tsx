import type { Course } from "../utils/gpaCalculator";
import { calculateGPA } from "../utils/gpaCalculator";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

type GraphsProps = {
  courses: Course[];
};

const COLORS = ["#2563eb", "#16a34a", "#f97316", "#dc2626"];

function Graphs({ courses }: GraphsProps) {
  /* ---------------- SEMESTER GPA DATA ---------------- */

  const semesterMap = courses.reduce((acc, course) => {
    if (!acc[course.semester]) acc[course.semester] = [];
    acc[course.semester].push(course);
    return acc;
  }, {} as Record<number, Course[]>);

  const semesterData = Object.entries(semesterMap)
    .map(([semester, list]) => ({
      semester: `Semester ${semester}`,
      gpa: calculateGPA(list),
    }))
    .sort((a, b) => a.semester.localeCompare(b.semester));

  /* ---------------- SUBJECT DATA ---------------- */

  const subjectMap = courses.reduce((acc, course) => {
    if (!acc[course.subject]) acc[course.subject] = [];
    acc[course.subject].push(course);
    return acc;
  }, {} as Record<string, Course[]>);

  const subjectData = Object.entries(subjectMap).map(([subject, list]) => ({
    subject,
    gpa: calculateGPA(list),
    count: list.length,
  }));

  /* ---------------- UI ---------------- */

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-2xl font-bold">Graphs</h1>

      {/* SEMESTER GPA LINE CHART */}
      <div className="border rounded-lg p-4">
        <h2 className="font-semibold mb-3">Semester GPA Trend</h2>

        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={semesterData}>
            <XAxis dataKey="semester" />
            <YAxis domain={[0, 4]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="gpa"
              stroke="#2563eb"
              strokeWidth={3}
              dot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* SUBJECT GPA BAR CHART */}
      <div className="border rounded-lg p-4">
        <h2 className="font-semibold mb-3">GPA by Subject</h2>

        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={subjectData}>
            <XAxis dataKey="subject" />
            <YAxis domain={[0, 4]} />
            <Tooltip />
            <Bar dataKey="gpa" fill="#16a34a" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* COURSE DISTRIBUTION PIE CHART */}
      <div className="border rounded-lg p-4">
        <h2 className="font-semibold mb-3">Course Distribution by Subject</h2>

        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={subjectData}
              dataKey="count"
              nameKey="subject"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label
            >
              {subjectData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Graphs;
