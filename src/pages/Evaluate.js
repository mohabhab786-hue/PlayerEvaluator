import { useState } from "react";

export default function EvaluationForm() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [role, setRole] = useState("Batsman");

  const [tech, setTech] = useState(5);
  const [speed, setSpeed] = useState(5);
  const [power, setPower] = useState(5);
  const [sense, setSense] = useState(5);

  const rating = ((tech + speed + power + sense) / 4).toFixed(1);

  const savePlayer = () => {
    if (!name || !age) {
      alert("Please enter player details");
      return;
    }

    const player = {
      id: Date.now(),
      name,
      age,
      role,
      rating: Number(rating),
      technique: tech,
      speed,
      power,
      sense
    };

    const existing = JSON.parse(localStorage.getItem("players")) || [];
    existing.push(player);
    localStorage.setItem("players", JSON.stringify(existing));

    alert("Player saved successfully!");

    setName("");
    setAge("");
    setRole("Batsman");
    setTech(5);
    setSpeed(5);
    setPower(5);
    setSense(5);
  };

  return (
    <div style={styles.page}>
      <h2 style={styles.title}>📝 Player Evaluation System</h2>

      <div style={styles.formContainer}>
        {/* LEFT: FORM */}
        <div style={styles.formBox}>
          <input
            placeholder="Player Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option>Batsman</option>
            <option>Bowler</option>
            <option>All-rounder</option>
            <option>Wicketkeeper</option>
          </select>

          <div style={styles.sliderBox}>
            <label>Technique: {tech}</label>
            <input type="range" min="1" max="10" value={tech} onChange={(e) => setTech(+e.target.value)} />
          </div>

          <div style={styles.sliderBox}>
            <label>Speed: {speed}</label>
            <input type="range" min="1" max="10" value={speed} onChange={(e) => setSpeed(+e.target.value)} />
          </div>

          <div style={styles.sliderBox}>
            <label>Power: {power}</label>
            <input type="range" min="1" max="10" value={power} onChange={(e) => setPower(+e.target.value)} />
          </div>

          <div style={styles.sliderBox}>
            <label>Game Sense: {sense}</label>
            <input type="range" min="1" max="10" value={sense} onChange={(e) => setSense(+e.target.value)} />
          </div>

          <button onClick={savePlayer} style={styles.button}>
            💾 Save Player
          </button>
        </div>

        {/* RIGHT: SCORE PANEL */}
        <div style={styles.scoreBox}>
          <h3>Overall Performance</h3>
          <h1>{rating} / 10</h1>
          <p>Live Scouting Score</p>
        </div>
      </div>
    </div>
  );
}

/* STYLES */
const styles = {
  page: {
    padding: "30px",
    background: "#000",
    minHeight: "100vh",
    color: "#fff"
  },

  title: {
    fontSize: "24px",
    marginBottom: "20px"
  },

  formContainer: {
    display: "flex",
    gap: "20px",
    alignItems: "flex-start",
    flexWrap: "wrap"
  },

  formBox: {
    flex: 2,
    minWidth: "350px",
    background: "#0b1220",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #1f2937",
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },

  scoreBox: {
    flex: 1,
    minWidth: "250px",
    background: "#111827",
    border: "1px solid #1f2937",
    padding: "25px",
    borderRadius: "12px",
    textAlign: "center"
  },

  sliderBox: {
    color: "#d1d5db"
  },

  button: {
    marginTop: "10px",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#38bdf8",
    color: "#000",
    fontWeight: "bold",
    cursor: "pointer"
  }
};