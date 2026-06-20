import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

export default function ComparePlayers() {
  const [players, setPlayers] = useState([]);
  const [player1Id, setPlayer1Id] = useState("");
  const [player2Id, setPlayer2Id] = useState("");

  useEffect(() => {
  const unsubscribe = onSnapshot(
    collection(db, "players"),
    (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }));

      setPlayers(data);
    }
  );

  return () => unsubscribe();
}, []);

  const getPlayer = (id) =>
    players.find((p) => String(p.id) === String(id));

  const skills = [
    "gameAwareness",
    "decisionMaking",
    "pressureHandling",
    "adaptability",
    "competitiveness",
    "coachability"
  ];

  const getScore = (p) =>
  p
    ? Number(
        (
          skills.reduce((sum, s) => sum + Number(p[s] || 0), 0) /
          skills.length
        ).toFixed(1)
      )
    : 0;

  const getStrengths = (p) =>
    skills
      .filter((s) => (p?.[s] || 0) >= 8)
      .map((s) => s.replace(/([A-Z])/g, " $1"));

  const getWeaknesses = (p) =>
    skills
      .filter((s) => (p?.[s] || 0) <= 5)
      .map((s) => s.replace(/([A-Z])/g, " $1"));

  const getImprovements = (p) =>
    skills
      .filter((s) => (p?.[s] || 0) < 7)
      .map((s) => `Improve ${s.replace(/([A-Z])/g, " $1")}`);

  const p1 = getPlayer(player1Id);
  const p2 = getPlayer(player2Id);

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>⚔ Player Comparison</h1>

      {/* SELECTORS */}
      <div style={styles.row}>
        {/* PLAYER 1 */}
        <select
          style={styles.select}
          value={player1Id}
          onChange={(e) => setPlayer1Id(e.target.value)}
        >
          <option value="">Select Player 1</option>
          {players
            .filter((p) => p.id !== player2Id) // ❌ prevent same player
            .map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
        </select>

        {/* PLAYER 2 */}
        <select
          style={styles.select}
          value={player2Id}
          onChange={(e) => setPlayer2Id(e.target.value)}
        >
          <option value="">Select Player 2</option>
          {players
            .filter((p) => p.id !== player1Id) // ❌ prevent same player
            .map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
        </select>
      </div>

      {/* BLOCK SAME PLAYER SAFETY */}
      {player1Id && player2Id && player1Id === player2Id && (
        <p style={{ color: "red", marginTop: "10px" }}>
          ❌ Cannot compare same player
        </p>
      )}

      {/* COMPARE */}
      {p1 && p2 && player1Id !== player2Id ? (
        <>
          <div style={styles.compareBox}>
            {/* PLAYER 1 */}
            <div style={styles.card}>
              <h2>{p1.name}</h2>
              <p>Role: {p1.role}</p>
              <p>⭐ Score: {getScore(p1)}/10</p>

              <h4 style={{ color: "#22c55e" }}>Strengths</h4>
              <p>{getStrengths(p1).join(", ") || "None"}</p>

              <h4 style={{ color: "#ef4444" }}>Weaknesses</h4>
              <p>{getWeaknesses(p1).join(", ") || "None"}</p>

              <h4 style={{ color: "#facc15" }}>Improvements</h4>
              <p>{getImprovements(p1).join(", ") || "Balanced"}</p>
            </div>

            <div style={styles.vs}>VS</div>

            {/* PLAYER 2 */}
            <div style={styles.card}>
              <h2>{p2.name}</h2>
              <p>Role: {p2.role}</p>
              <p>⭐ Score: {getScore(p2)}/10</p>

              <h4 style={{ color: "#22c55e" }}>Strengths</h4>
              <p>{getStrengths(p2).join(", ") || "None"}</p>

              <h4 style={{ color: "#ef4444" }}>Weaknesses</h4>
              <p>{getWeaknesses(p2).join(", ") || "None"}</p>

              <h4 style={{ color: "#facc15" }}>Improvements</h4>
              <p>{getImprovements(p2).join(", ") || "Balanced"}</p>
            </div>
          </div>

          {/* VERDICT */}
          <div style={styles.verdict}>
            🧠 Scout Verdict:{" "}
            {getScore(p1) > getScore(p2)
              ? `${p1.name} is better overall`
              : getScore(p2) > getScore(p1)
              ? `${p2.name} is better overall`
              : "Both players are equally matched"}
          </div>
        </>
      ) : (
        <p style={{ marginTop: "20px", color: "#facc15" }}>
          Select two different players to compare
        </p>
      )}
    </div>
  );
}

/* STYLES */
const styles = {
  page: {
    padding: "25px",
    minHeight: "100vh",
    background: "#0a0f1f",
    color: "#fff"
  },

  title: {
    fontSize: "26px",
    fontWeight: "800",
    color: "#38bdf8",
    marginBottom: "20px"
  },

  row: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px"
  },

  select: {
    flex: 1,
    padding: "12px",
    borderRadius: "10px",
    background: "#111827",
    color: "#fff",
    border: "1px solid #334155"
  },

  compareBox: {
    display: "flex",
    gap: "20px"
  },

  card: {
    flex: 1,
    background: "linear-gradient(135deg, #111827, #0b1220)",
    padding: "20px",
    borderRadius: "12px"
  },

  vs: {
    fontSize: "28px",
    fontWeight: "900",
    color: "#facc15",
    display: "flex",
    alignItems: "center"
  },

  verdict: {
    marginTop: "20px",
    padding: "15px",
    background: "#111827",
    borderRadius: "10px",
    color: "#38bdf8",
    fontWeight: "600"
  }
};