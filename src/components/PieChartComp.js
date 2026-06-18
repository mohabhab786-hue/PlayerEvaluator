import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { useEffect, useState } from "react";

const COLORS = [
  "#38bdf8",
  "#22c55e",
  "#f59e0b",
  "#ef4444",
  "#a855f7",
  "#14b8a6",
  "#f97316",
  "#eab308"
];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize={12}
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function PieChartComp() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const players = JSON.parse(localStorage.getItem("players")) || [];

    const formatted = players.map((p) => ({
      name: p.name,
      value: Number(p.rating) || 0
    }));

    setData(formatted);
  }, []);

  if (data.length === 0) {
    return <p style={{ color: "#fff" }}>No data available</p>;
  }

  return (
    <div
      style={{
        width: "100%",
        height: "450px"
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="42%"
            innerRadius={70}
            outerRadius={110}
            paddingAngle={3}
            label={renderCustomizedLabel}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <text
            x="50%"
            y="42%"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#ffffff"
            fontSize={18}
            fontWeight="bold"
          >
            {data.length}
          </text>

          <text
            x="50%"
            y="48%"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="#9ca3af"
            fontSize={13}
          >
            Players
          </text>

          <Tooltip />

          <Legend
            verticalAlign="bottom"
            align="center"
            layout="horizontal"
            iconType="circle"
            wrapperStyle={{
              color: "#fff",
              fontSize: "13px",
              lineHeight: "24px",
              paddingTop: "20px"
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}