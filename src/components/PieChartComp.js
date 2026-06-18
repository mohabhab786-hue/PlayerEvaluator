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
    return <p style={{ color: "white" }}>No data available</p>;
  }

  return (
    <div
      style={{
        width: "100%",
        height: "400px"
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="40%"
            cy="50%"
            innerRadius={60}
            outerRadius={110}
            label={({ percent }) =>
              `${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />

          <Legend
            layout="vertical"
            verticalAlign="middle"
            align="right"
            wrapperStyle={{
              fontSize: "12px",
              width: "150px",
              lineHeight: "18px",
              wordBreak: "break-word",
              color: "#fff"
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}