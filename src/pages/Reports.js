import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import PlayerPieChart from "../components/PlayerPieChart";
import { subscribeToPlayers } from "../data/players";

export default function Reports() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToPlayers(setPlayers);
    return () => unsubscribe();
  }, []);

  // 🧠 SCOUT ENGINE
  const getInsights = (player) => {
    const skills = [
      {
        name: "Game Awareness",
        value: player.gameAwareness || 0,
        tip: "Watch match analysis videos and study field placements."
      },
      {
        name: "Decision Making",
        value: player.decisionMaking || 0,
        tip: "Practice quick decision drills under pressure."
      },
      {
        name: "Pressure Handling",
        value: player.pressureHandling || 0,
        tip: "Simulate match pressure situations in training."
      },
      {
        name: "Adaptability",
        value: player.adaptability || 0,
        tip: "Play in different roles and conditions."
      },
      {
        name: "Competitiveness",
        value: player.competitiveness || 0,
        tip: "Improve mindset with match challenges."
      },
      {
        name: "Coachability",
        value: player.coachability || 0,
        tip: "Apply coach feedback consistently."
      }
    ];

    let strengths = [];
    let weaknesses = [];
    let improvements = [];

    let sum = 0;

    skills.forEach((s) => {
      sum += s.value;

      if (s.value >= 8) strengths.push(s.name);

      if (s.value <= 5) {
        weaknesses.push({
          name: s.name,
          tip: s.tip
        });

        improvements.push(`${s.name}: ${s.tip}`);
      }
    });

    const avg = sum / skills.length;

    return {
      strengths,
      weaknesses,
      improvements,
      avg
    };
  };

  // 📄 PDF GENERATOR
  const generatePDF = async (player) => {
        const ins = getInsights(player);
    const doc = new jsPDF("p", "mm", "a4");

    let y = 20;

    // HEADER
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 210, 30, "F");

    doc.setFontSize(18);
    doc.setTextColor(56, 189, 248);
    doc.text("PLAYER SCOUT REPORT", 50, 18);

    y = 40;

    // PLAYER INFO
    doc.setFillColor(241, 245, 249);
    doc.rect(10, y - 10, 190, 40, "F");

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text(`Name: ${player.name}`, 15, y);
    doc.text(`Age: ${player.age}`, 15, y + 7);
    doc.text(`Role: ${player.role}`, 15, y + 14);
    doc.text(`Rating: ${player.rating}/10`, 15, y + 21);

    y += 55;

    // STRENGTHS
    doc.setFillColor(220, 252, 231);
    doc.rect(10, y - 8, 190, 10 + ins.strengths.length * 8, "F");

    doc.setTextColor(22, 163, 74);
    doc.setFontSize(14);
    doc.text("STRENGTHS", 15, y);

    y += 10;
    doc.setFontSize(11);

    ins.strengths.forEach((s) => {
      doc.text(`• ${s}`, 20, y);
      y += 7;
    });

    y += 5;

    // WEAKNESSES
    doc.setFillColor(254, 226, 226);
    doc.rect(10, y - 8, 190, 10 + ins.weaknesses.length * 15, "F");

    doc.setTextColor(220, 38, 38);
    doc.setFontSize(14);
    doc.text("WEAKNESSES & FIX", 15, y);

    y += 10;

    doc.setFontSize(11);

    ins.weaknesses.forEach((w) => {
      doc.setTextColor(185, 28, 28);
      doc.text(`• ${w.name}`, 20, y);
      y += 6;

      doc.setTextColor(75, 85, 99);
      doc.text(`→ ${w.tip}`, 22, y, {
        maxWidth: 165
      });

      y += 10;
    });

    y += 5;

    // IMPROVEMENT PLAN
    doc.setFillColor(254, 249, 195);
    doc.rect(10, y - 8, 190, 10 + ins.improvements.length * 8, "F");

    doc.setTextColor(161, 98, 7);
    doc.setFontSize(14);
    doc.text("IMPROVEMENT PLAN", 15, y);

    y += 10;

    doc.setFontSize(11);

    ins.improvements.forEach((i) => {
      doc.text(`• ${i}`, 20, y, {
        maxWidth: 165
      });

      y += 7;
    });
        // CHART PAGE
    const chart = document.getElementById("chart-" + player.id);

    if (chart) {
      const canvas = await html2canvas(chart, {
        scale: 2,
        useCORS: true
      });

      const img = canvas.toDataURL("image/png");

      doc.addPage();

      doc.setFillColor(15, 23, 42);
      doc.rect(0, 0, 210, 20, "F");

      doc.setTextColor(56, 189, 248);
      doc.setFontSize(16);
      doc.text(`${player.name} Performance Chart`, 45, 15);

      doc.addImage(img, "PNG", 15, 30, 180, 180);
    }

    // FINAL VERDICT
    doc.addPage();

    let verdict =
      player.rating >= 8
        ? "ELITE PLAYER - BALANCED SKILLS"
        : player.rating >= 6
        ? "GOOD POTENTIAL - NEEDS TRAINING"
        : "DEVELOPMENT REQUIRED";

    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 210, 40, "F");

    doc.setTextColor(56, 189, 248);
    doc.setFontSize(18);
    doc.text("SCOUT VERDICT", 65, 25);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(13);
    doc.text(verdict, 20, 70, { maxWidth: 170 });

    doc.save(`${player.name}-report.pdf`);
  };

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h1>📄 Player Reports</h1>

      {players.map((player) => {
        const ins = getInsights(player);

        return (
          <div
            key={player.id}
            style={{
              background: "#111827",
              padding: "20px",
              borderRadius: "16px",
              marginBottom: "20px"
            }}
          >
            <h2>🏏 {player.name}</h2>

            <p>⭐ Rating: {player.rating}/10</p>

            <p style={{ color: "#22c55e" }}>
              🟢 Strengths: {ins.strengths.join(", ") || "None"}
            </p>

            <p style={{ color: "#ef4444" }}>
              🔴 Weaknesses:
              {ins.weaknesses.length > 0
                ? ins.weaknesses.map((w, i) => (
                    <span key={i}> {w.name},</span>
                  ))
                : " None"}
            </p>

            <p style={{ color: "#facc15" }}>
              📈 Improvements:
              {ins.improvements.join(", ") || "Balanced Player"}
            </p>

            <div
              id={"chart-" + player.id}
              style={{
                background: "#fff",
                borderRadius: "20px",
                padding: "20px",
                marginTop: "15px"
              }}
            >
              <PlayerPieChart player={player} />
            </div>

            <button
              onClick={() => generatePDF(player)}
              style={{
                marginTop: "15px",
                padding: "12px 20px",
                background: "#38bdf8",
                border: "none",
                borderRadius: "10px",
                color: "#fff",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              📄 Generate Report
            </button>
          </div>
        );
      })}
    </div>
  );
}                   