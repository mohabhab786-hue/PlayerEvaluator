import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#14B8A6"
];

export default function PlayerPieChart({ player }) {
  const data = [
    {
      name: "Game Awareness",
      value: Number(player.gameAwareness || 0)
    },
    {
      name: "Decision Making",
      value: Number(player.decisionMaking || 0)
    },
    {
      name: "Pressure Handling",
      value: Number(player.pressureHandling || 0)
    },
    {
      name: "Adaptability",
      value: Number(player.adaptability || 0)
    },
    {
      name: "Competitiveness",
      value: Number(player.competitiveness || 0)
    },
    {
      name: "Coachability",
      value: Number(player.coachability || 0)
    }
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "420px",          // ✅ FIXED (mobile safe)
        maxWidth: "100%",
        background: "#ffffff",
        borderRadius: "20px",
        padding: "15px",
        overflow: "hidden"        // ✅ prevents cutting
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="40%"                // ✅ slightly adjusted
            innerRadius="40%"       // ✅ responsive
            outerRadius="70%"       // ✅ responsive (FIX MAIN ISSUE)
            paddingAngle={3}
            label={false}           // ✅ prevents mobile cut
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip formatter={(value) => [`${value}/10`, "Score"]} />

          <Legend
            verticalAlign="bottom"
            align="center"
            layout="horizontal"
            iconType="circle"
            wrapperStyle={{
              paddingTop: "10px",
              fontSize: "12px",
              fontWeight: "bold",
              color: "#000"
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}