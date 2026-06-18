import { useState } from "react";

export default function EvaluationForm() {
  const [playerName, setPlayerName] = useState("");
  const [age, setAge] = useState("");
  const [role, setRole] = useState("Batsman");

  const [gameAwareness, setGameAwareness] = useState(5);
  const [decisionMaking, setDecisionMaking] = useState(5);
  const [pressureHandling, setPressureHandling] = useState(5);
  const [adaptability, setAdaptability] = useState(5);
  const [competitiveness, setCompetitiveness] = useState(5);
  const [coachability, setCoachability] = useState(5);

  const score =
    (
      (gameAwareness +
        decisionMaking +
        pressureHandling +
        adaptability +
        competitiveness +
        coachability) /
      6
    ).toFixed(1);

  const savePlayer = () => {
    if (!playerName || !age) {
      alert("Please enter player details");
      return;
    }

    const player = {
      id: Date.now(),
      name: playerName,
      age,
      role,

      gameAwareness,
      decisionMaking,
      pressureHandling,
      adaptability,
      competitiveness,
      coachability,

      rating: Number(score)
    };

    const existing = JSON.parse(localStorage.getItem("players")) || [];
    existing.push(player);
    localStorage.setItem("players", JSON.stringify(existing));

    alert("Player saved successfully!");

    setPlayerName("");
    setAge("");
    setRole("Batsman");

    setGameAwareness(5);
    setDecisionMaking(5);
    setPressureHandling(5);
    setAdaptability(5);
    setCompetitiveness(5);
    setCoachability(5);
  };

  return (
    <div style={styles.page}>
      <h1>📝 Player Evaluation</h1>

      <input
        style={styles.input}
        placeholder="Player Name"
        value={playerName}
        onChange={(e) => setPlayerName(e.target.value)}
      />

      <input
        style={styles.input}
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <select
        style={styles.input}
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        <option>Batsman</option>
        <option>Bowler</option>
        <option>All-rounder</option>
        <option>Wicketkeeper</option>
      </select>

      {/* 🔥 FACTOR SLIDERS */}
      {[
        ["Game Awareness", gameAwareness, setGameAwareness],
        ["Decision Making", decisionMaking, setDecisionMaking],
        ["Pressure Handling", pressureHandling, setPressureHandling],
        ["Adaptability", adaptability, setAdaptability],
        ["Competitiveness", competitiveness, setCompetitiveness],
        ["Coachability", coachability, setCoachability]
      ].map(([label, value, setter]) => (
        <div key={label} style={styles.sliderBox}>
          <label>{label}: {value}</label>
          <input
            type="range"
            min="1"
            max="10"
            value={value}
            onChange={(e) => setter(+e.target.value)}
          />
        </div>
      ))}

      <div style={styles.score}>⭐ Overall Score: {score}/10</div>

      <button style={styles.button} onClick={savePlayer}>
        Save Player
      </button>
    </div>
  );
}

const styles = {
  page: {
    background: "#000",
    color: "#fff",
    padding: "25px",
    minHeight: "100vh"
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "8px"
  },

  sliderBox: {
    marginTop: "15px"
  },

  score: {
    marginTop: "20px",
    fontSize: "20px",
    color: "#38bdf8"
  },

  button: {
    marginTop: "20px",
    padding: "12px",
    width: "100%",
    background: "#22c55e",
    border: "none",
    borderRadius: "8px",
    color: "#fff",
    fontWeight: "bold"
  }
};