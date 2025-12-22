import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type GPAData = {
  semester: string;
  gpa: number;
};

const data: GPAData[] = [
  { semester: "Y1 S1", gpa: 3.0 },
  { semester: "Y1 S2", gpa: 3.2 },
  { semester: "Y2 S1", gpa: 3.4 },
  { semester: "Y2 S2", gpa: 3.42 },
];

function GPAChart() {
  return (
    <div className="w-full h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 30, bottom: 10 }}
        >
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
