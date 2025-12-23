import type { Course } from "../utils/gpaCalculator";
import { calculateGPA } from "../utils/gpaCalculator";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type GPAChartProps = {
  courses: Course[];
};

function GPAChart({ courses }: GPAChartProps) {
  if (courses.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-400">
        No GPA data yet
      </div>
    );
  }

  // Group by semester
  const semesterMap = courses.reduce((acc, course) => {
    acc[course.semester] = acc[course.semester] || [];
    acc[course.semester].push(course);
    return acc;
  }, {} as Record<number, Course[]>);

  const data = Object.entries(semesterMap)
    .map(([semester, list]) => ({
      semester: `Semester ${semester}`,
      gpa: calculateGPA(list),
    }))
    .sort((a, b) => a.semester.localeCompare(b.semester));

  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="semester" />
          <YAxis domain={[0, 4]} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="gpa"
            stroke="#2563eb"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default GPAChart;
