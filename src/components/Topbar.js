export default function Topbar() {
  return (
    <div style={styles.topbar}>
      <h2>Player Evaluator Dashboard</h2>

      <div style={styles.profile}>
        👤 Admin
      </div>
    </div>
  );
}

const styles = {
  topbar: {
    background: "white",
    padding: "15px 20px",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)"
  },

  profile: {
    fontWeight: "bold"
  }
};