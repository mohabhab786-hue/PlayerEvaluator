import { useEffect, useState } from "react";
import PieChartComp from "../components/PieChartComp";
import BarChartComp from "../components/BarChartComp";
import { subscribeToPlayers } from "../data/players";

export default function Dashboard() {
  const [players, setPlayers] = useState([]);

  // 🔥 Real-time Firebase sync
  useEffect(() => {
    const unsubscribe = subscribeToPlayers(setPlayers);

    return () => unsubscribe();
  }, []);

  const totalPlayers = players.length;

  const avgRating =
    totalPlayers > 0
      ? (
          players.reduce((sum, p) => sum + Number(p.rating), 0) / totalPlayers
        ).toFixed(1)
      : 0;

  const elitePlayers = players.filter((p) => p.rating >= 8).length;

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🏏 Scout Analytics Dashboard</h2>

      {/* TOP CARDS */}
      <div style={styles.cardRow}>
        <div style={styles.card}>
          <h3>Total Players</h3>
          <h1>{totalPlayers}</h1>
        </div>

        <div style={styles.card}>
          <h3>Average Rating</h3>
          <h1>{avgRating}</h1>
        </div>

        <div style={styles.card}>
          <h3>Elite Players</h3>
          <h1>{elitePlayers}</h1>
        </div>
      </div>

      {/* CHART SECTION */}
      <div style={styles.chartRow}>
        <div style={styles.panel}>
          <h3 style={styles.panelTitle}>Skill Distribution</h3>
          <PieChartComp />
        </div>

        <div style={styles.panel}>
          <h3 style={styles.panelTitle}>Top Performers</h3>
          <BarChartComp />
        </div>
      </div>
    </div>
  );
}

/* STYLES */
const styles = {
  container: {
    padding: "20px",
    background: "#000000",
    minHeight: "100vh",
    color: "#ffffff"
  },

  title: {
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "20px",
    color: "#ffffff"
  },

  cardRow: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap"
  },

  card: {
    flex: 1,
    minWidth: "200px",
    background: "#0b1220",
    border: "1px solid #1f2937",
    padding: "20px",
    borderRadius: "12px",
    color: "#ffffff"
  },

  chartRow: {
    display: "flex",
    gap: "15px",
    marginTop: "20px",
    flexWrap: "wrap"
  },

  panel: {
    flex: 1,
    minWidth: "300px",
    background: "#0b1220",
    border: "1px solid #1f2937",
    padding: "20px",
    borderRadius: "12px"
  },

  panelTitle: {
    marginBottom: "10px",
    color: "#ffffff"
  }
};