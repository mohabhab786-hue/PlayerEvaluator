import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";

export default function BarChartComp() {
  const players = JSON.parse(localStorage.getItem("players")) || [];

  const data = players.map((p) => ({
    name: p.name,
    rating: p.rating
  }));

  if (players.length === 0) {
    return <p style={{ color: "#aaa" }}>No players yet</p>;
  }

  return (
    <div
      style={{
        width: "100%",
        height: "400px"
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 20,
            right: 20,
            left: 0,
            bottom: 80
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />

          <XAxis
            dataKey="name"
            interval={0}
            angle={-25}
            textAnchor="end"
            height={90}
            tick={{
              fill: "#ffffff",
              fontSize: 11
            }}
          />

          <YAxis
            domain={[0, 10]}
            tick={{
              fill: "#ffffff"
            }}
          />

          <Tooltip />

          <Bar
            dataKey="rating"
            fill="#38bdf8"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}