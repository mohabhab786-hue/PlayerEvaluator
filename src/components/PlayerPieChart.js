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

// ✅ CLEAN ARROW LABEL
const renderCustomLabel = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, outerRadius, name, value } = props;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);

  const sx = cx + outerRadius * cos;
  const sy = cy + outerRadius * sin;

  const mx = cx + (outerRadius + 12) * cos;
  const my = cy + (outerRadius + 12) * sin;

  const ex = mx + (cos >= 0 ? 18 : -18);
  const ey = my;

  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <path
        d={`M${sx},${sy} L${mx},${my} L${ex},${ey}`}
        stroke="#94a3b8"
        strokeWidth={1.2}
        fill="none"
      />
      <text
        x={ex}
        y={ey}
        textAnchor={textAnchor}
        fontSize={10}
        fill="#111827"
      >
        {`${name}: ${value}`}
      </text>
    </g>
  );
};

export default function PlayerPieChart({ player }) {
  const isMobile =
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 600px)").matches;

  const data = [
    { name: "Game Awareness", value: Number(player.gameAwareness || 0) },
    { name: "Decision Making", value: Number(player.decisionMaking || 0) },
    { name: "Pressure Handling", value: Number(player.pressureHandling || 0) },
    { name: "Adaptability", value: Number(player.adaptability || 0) },
    { name: "Competitiveness", value: Number(player.competitiveness || 0) },
    { name: "Coachability", value: Number(player.coachability || 0) }
  ];

  return (
    <div
      style={{
        width: "100%",
        height: isMobile ? "320px" : "450px",
        background: "#fff",
        borderRadius: "20px",
        padding: "10px",
        overflow: "hidden"
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy={isMobile ? "45%" : "50%"}
            innerRadius={isMobile ? 40 : 70}
            outerRadius={isMobile ? 70 : 120}
            paddingAngle={3}
            label={!isMobile ? renderCustomLabel : false}
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip formatter={(v) => [`${v}/10`, "Score"]} />

          <Legend
            verticalAlign="bottom"
            iconType="circle"
            wrapperStyle={{ fontSize: "11px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}