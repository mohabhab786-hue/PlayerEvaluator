import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import PlayerPieChart from "../components/PlayerPieChart";

export default function Reports() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("players")) || [];
    setPlayers(data);
  }, []);

  const generatePDF = async (player) => {
    const doc = new jsPDF("p", "mm", "a4");

    // PAGE 1
    doc.setFontSize(20);
    doc.text("PLAYER PERFORMANCE REPORT", 50, 20);

    doc.setFontSize(14);
    doc.text(`Name : ${player.name}`, 20, 40);
    doc.text(`Age : ${player.age}`, 20, 50);
    doc.text(`Role : ${player.role}`, 20, 60);
    doc.text(`Overall Rating : ${player.rating}/10`, 20, 70);

    doc.text(`Game Awareness : ${player.gameAwareness || 0}`, 20, 90);
    doc.text(`Decision Making : ${player.decisionMaking || 0}`, 20, 100);
    doc.text(`Pressure Handling : ${player.pressureHandling || 0}`, 20, 110);
    doc.text(`Adaptability : ${player.adaptability || 0}`, 20, 120);
    doc.text(`Competitiveness : ${player.competitiveness || 0}`, 20, 130);
    doc.text(`Coachability : ${player.coachability || 0}`, 20, 140);

    // PAGE 2 - PIE CHART
    const chart = document.getElementById("chart-" + player.id);

    if (chart) {
      const canvas = await html2canvas(chart, {
        scale: 8,
        useCORS: true,
        backgroundColor: "#ffffff",
        width: chart.scrollWidth,
        height: chart.scrollHeight
      });

      const imgData = canvas.toDataURL("image/png");

      doc.addPage();

      doc.setFontSize(18);
      doc.text(`${player.name} Skill Distribution`, 50, 15);

      // fit inside page without shrinking labels
      doc.addImage(
        imgData,
        "PNG",
        5,
        20,
        200,
        240
      );
    }

    doc.save(`${player.name}-report.pdf`);
  };

  return (
    <div
      style={{
        padding: "20px",
        color: "white"
      }}
    >
      <h1>📄 Player Reports</h1>

      {players.map((player) => (
        <div
          key={player.id}
          style={{
            background: "#111827",
            padding: "20px",
            borderRadius: "20px",
            marginBottom: "30px"
          }}
        >
          <h2>🏏 {player.name}</h2>

          <p>⭐ Overall Rating : {player.rating}/10</p>
          <p>Game Awareness : {player.gameAwareness || 0}</p>
          <p>Decision Making : {player.decisionMaking || 0}</p>
          <p>Pressure Handling : {player.pressureHandling || 0}</p>
          <p>Adaptability : {player.adaptability || 0}</p>
          <p>Competitiveness : {player.competitiveness || 0}</p>
          <p>Coachability : {player.coachability || 0}</p>

          <div
            id={"chart-" + player.id}
            style={{
              background: "#ffffff",
              borderRadius: "25px",
              padding: "30px",
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              overflow: "visible"
            }}
          >
            <PlayerPieChart player={player} />
          </div>

          <button
            onClick={() => generatePDF(player)}
            style={{
              marginTop: "20px",
              background: "#38bdf8",
              color: "white",
              border: "none",
              padding: "14px 24px",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "16px"
            }}
          >
            📄 Generate PDF
          </button>
        </div>
      ))}
    </div>
  );
}