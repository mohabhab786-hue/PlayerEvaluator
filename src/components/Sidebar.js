import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div
      style={{
        width: "280px",
        minHeight: "100vh",
        background: "#0a0f1c",
        padding: "25px",
        borderRight: "1px solid #1f2937",
        color: "#fff"
      }}
    >
      <div
        style={{
          textAlign: "center",
          marginBottom: "40px",
          borderBottom: "1px solid #1f2937",
          paddingBottom: "20px"
        }}
      >
        <div style={{ fontSize: "50px" }}>🏏</div>

        <h2
          style={{
            margin: "10px 0 0 0",
            color: "#38bdf8",
            fontSize: "24px",
            fontWeight: "800",
            letterSpacing: "2px"
          }}
        >
          SCOUT
        </h2>

        <h2
          style={{
            margin: "0",
            color: "#ffffff",
            fontSize: "24px",
            fontWeight: "800",
            letterSpacing: "2px"
          }}
        >
          EVALUATOR
        </h2>
      </div>

      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px"
        }}
      >
        <Link style={linkStyle} to="/">
          📊 Dashboard
        </Link>

        <Link style={linkStyle} to="/evaluate">
          📝 Evaluate Player
        </Link>

        <Link style={linkStyle} to="/players">
          👤 Players Database
        </Link>

        <Link style={linkStyle} to="/reports">
          📄 Reports
        </Link>
      </nav>
    </div>
  );
}

const linkStyle = {
  color: "#ffffff",
  textDecoration: "none",
  fontSize: "17px",
  fontWeight: "600",
  padding: "14px",
  borderRadius: "10px",
  background: "#111827",
  display: "block"
};