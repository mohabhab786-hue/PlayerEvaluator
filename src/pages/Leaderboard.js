import { useEffect, useState } from "react";

export default function Leaderboard() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("players")) || [];
    setPlayers(data);
  }, []);

  // 🏆 SORT PLAYERS BY RATING (IPL TABLE STYLE)
  const sortedPlayers = [...players].sort((a, b) => b.rating - a.rating);

  // 🎯 GET PLAYER CATEGORY
  const getTier = (rating) => {
    if (rating >= 8.5) return { text: "ELITE", color: "#3b82f6" };
    if (rating >= 7) return { text: "GOOD", color: "#22c55e" };
    if (rating >= 5) return { text: "AVERAGE", color: "#facc15" };
    return { text: "DEVELOPING", color: "#ef4444" };
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>🏆 IPL Style Leaderboard</h1>

      {sortedPlayers.length === 0 ? (
        <p style={{ color: "#facc15" }}>No players available</p>
      ) : (
        <div style={styles.table}>
          {/* HEADER */}
          <div style={styles.headerRow}>
            <div>Rank</div>
            <div>Player</div>
            <div>Role</div>
            <div>Rating</div>
            <div>Tier</div>
          </div>

          {/* ROWS */}
          {sortedPlayers.map((p, index) => {
            const tier = getTier(p.rating);

            return (
              <div key={p.id} style={styles.row}>
                <div style={styles.rank}>#{index + 1}</div>

                <div style={styles.name}>{p.name}</div>

                <div style={styles.role}>{p.role}</div>

                <div style={styles.rating}>
                  ⭐ {Number(p.rating).toFixed(1)}
                </div>

                <div
                  style={{
                    ...styles.tier,
                    color: tier.color,
                    border: `1px solid ${tier.color}`
                  }}
                >
                  {tier.text}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* 🎨 STYLES */
const styles = {
  page: {
    padding: "25px",
    background: "linear-gradient(135deg, #0a0f1f, #020617)",
    minHeight: "100vh",
    color: "#fff"
  },

  title: {
    fontSize: "28px",
    fontWeight: "800",
    marginBottom: "20px",
    color: "#38bdf8"
  },

  table: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },

  headerRow: {
    display: "grid",
    gridTemplateColumns: "0.5fr 2fr 1.5fr 1fr 1fr",
    padding: "12px",
    background: "#111827",
    borderRadius: "10px",
    fontWeight: "700",
    color: "#38bdf8"
  },

  row: {
    display: "grid",
    gridTemplateColumns: "0.5fr 2fr 1.5fr 1fr 1fr",
    padding: "12px",
    background: "#0f172a",
    borderRadius: "10px",
    alignItems: "center"
  },

  rank: {
    fontWeight: "700",
    color: "#facc15"
  },

  name: {
    fontWeight: "600"
  },

  role: {
    color: "#94a3b8"
  },

  rating: {
    color: "#22c55e",
    fontWeight: "600"
  },

  tier: {
    padding: "6px 10px",
    borderRadius: "8px",
    fontWeight: "700",
    textAlign: "center"
  }
};