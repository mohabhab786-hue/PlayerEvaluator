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
        height: "350px"
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={90}
            paddingAngle={3}
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
            iconType="circle"
            wrapperStyle={{
              fontSize: "13px",
              lineHeight: "22px",
              color: "#fff",
              paddingLeft: "15px"
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}