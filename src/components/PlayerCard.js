export default function PlayerCard({ player }) {
  return (
    <div style={styles.card}>
      <h3 style={styles.name}>{player.name}</h3>

      <p>🎯 Role: {player.role}</p>
      <p>⭐ Rating: {player.rating}/10</p>

      <div style={styles.badge}>
        {player.rating >= 8
          ? "🔥 Elite"
          : player.rating >= 6
          ? "⚡ Good"
          : "📊 Developing"}
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: "#0b1220",
    border: "1px solid #1f2937",
    padding: "16px",
    borderRadius: "12px",
    color: "#ffffff",
    boxShadow: "0 4px 12px rgba(0,0,0,0.6)"
  },

  name: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#ffffff"
  },

  badge: {
    marginTop: "10px",
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: "6px",
    background: "#1e293b",
    color: "#38bdf8",
    fontSize: "12px"
  }
};