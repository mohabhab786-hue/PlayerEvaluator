import { useEffect, useState } from "react";
import { subscribeToPlayers } from "../data/players";
import {
  deletePlayer as deletePlayerFromDB,
  updatePlayer
} from "../utils/playerStorage";

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const [form, setForm] = useState({
    name: "",
    age: "",
    role: "",
    gameAwareness: 5,
    decisionMaking: 5,
    pressureHandling: 5,
    adaptability: 5,
    competitiveness: 5,
    coachability: 5
  });

  // 🔥 Real-time Firebase sync
  useEffect(() => {
    const unsubscribe = subscribeToPlayers(setPlayers);

    return () => unsubscribe();
  }, []);

  // ❌ Delete player
  const deletePlayer = async (id) => {
    await deletePlayerFromDB(id);
  };

  // ✏️ Start editing
  const startEdit = (player) => {
    setEditingId(player.id);

    setForm({
      name: player.name,
      age: player.age,
      role: player.role,
      gameAwareness: player.gameAwareness || 5,
      decisionMaking: player.decisionMaking || 5,
      pressureHandling: player.pressureHandling || 5,
      adaptability: player.adaptability || 5,
      competitiveness: player.competitiveness || 5,
      coachability: player.coachability || 5
    });
  };

  const handleSkillChange = (field, value) => {
    value = Number(value);

    if (value > 10) {
      alert("Maximum value allowed is 10");
      return;
    }

    setForm({
      ...form,
      [field]: value
    });
  };

  // 💾 Save edited player
  const saveEdit = async () => {
    const rating =
      (
        Number(form.gameAwareness) +
        Number(form.decisionMaking) +
        Number(form.pressureHandling) +
        Number(form.adaptability) +
        Number(form.competitiveness) +
        Number(form.coachability)
      ) / 6;

    await updatePlayer({
      id: editingId,
      ...form,
      rating: Number(rating.toFixed(1))
    });

    setEditingId(null);
  };

  // 🧠 Insights Engine
  const getInsights = (p) => {
    const skills = [
      { name: "Game Awareness", value: p.gameAwareness },
      { name: "Decision Making", value: p.decisionMaking },
      { name: "Pressure Handling", value: p.pressureHandling },
      { name: "Adaptability", value: p.adaptability },
      { name: "Competitiveness", value: p.competitiveness },
      { name: "Coachability", value: p.coachability }
    ];

    let strengths = [];
    let weaknesses = [];
    let improvement = [];

    let total = 0;

    skills.forEach((s) => {
      total += s.value;

      if (s.value >= 8) strengths.push(s.name);
      else if (s.value <= 5) {
        weaknesses.push(s.name);
        improvement.push(`Improve ${s.name}`);
      }
    });

    const avg = total / skills.length;

    let tier = "";

    if (avg >= 8) tier = "ELITE PROSPECT";
    else if (avg >= 6) tier = "GOOD POTENTIAL";
    else tier = "DEVELOPMENT REQUIRED";

    return { strengths, weaknesses, improvement, tier, avg };
  };

  const getVerdictStyle = (tier) => {
    switch (tier) {
      case "ELITE PROSPECT":
        return {
          color: "#22c55e",
          background: "rgba(34,197,94,0.15)",
          border: "1px solid #22c55e",
          boxShadow: "0 0 12px rgba(34,197,94,0.3)"
        };

      case "GOOD POTENTIAL":
        return {
          color: "#38bdf8",
          background: "rgba(56,189,248,0.15)",
          border: "1px solid #38bdf8",
          boxShadow: "0 0 12px rgba(56,189,248,0.3)"
        };

      default:
        return {
          color: "#ef4444",
          background: "rgba(239,68,68,0.15)",
          border: "1px solid #ef4444",
          boxShadow: "0 0 12px rgba(239,68,68,0.3)"
        };
    }
  };

  const filteredPlayers = players.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesRole =
      roleFilter === "All" || p.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  // PART 2 CONTINUES BELOW
    return (
    <div style={styles.page}>
      <h1 style={styles.title}>🏏 Players Database</h1>

      <div style={styles.filterRow}>
        <input
          placeholder="Search Player..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          style={styles.input}
        >
          <option value="All">All Roles</option>
          <option>Batsman</option>
          <option>Bowler</option>
          <option>All-rounder</option>
          <option>Wicketkeeper</option>
        </select>
      </div>

      {filteredPlayers.map((p) => {
        const ins = getInsights(p);
        const verdictStyle = getVerdictStyle(ins.tier);

        return (
          <div key={p.id} style={styles.card}>
            {editingId === p.id ? (
              <>
                <input
                  style={styles.input}
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />

                <input
                  style={styles.input}
                  value={form.age}
                  onChange={(e) =>
                    setForm({ ...form, age: e.target.value })
                  }
                />

                <input
                  style={styles.input}
                  value={form.role}
                  onChange={(e) =>
                    setForm({ ...form, role: e.target.value })
                  }
                />

                {Object.keys(form)
                  .slice(3)
                  .map((key) => (
                    <input
                      key={key}
                      type="number"
                      max="10"
                      style={styles.input}
                      value={form[key]}
                      onChange={(e) =>
                        handleSkillChange(key, e.target.value)
                      }
                    />
                  ))}

                <button style={styles.saveBtn} onClick={saveEdit}>
                  💾 Save
                </button>
              </>
            ) : (
              <>
                <h2>{p.name}</h2>
                <p>Age: {p.age}</p>
                <p>Role: {p.role}</p>
                <p>⭐ Rating: {p.rating}/10</p>

                <div style={{ marginTop: "10px" }}>
                  <p
                    style={{
                      ...verdictStyle,
                      padding: "8px 12px",
                      borderRadius: "12px",
                      display: "inline-block",
                      fontWeight: "bold"
                    }}
                  >
                    🧠 Scout Verdict: {ins.tier}
                  </p>

                  <p style={{ color: "#facc15" }}>
                    📊 Intelligence Score: {ins.avg.toFixed(1)}/10
                  </p>
                </div>

                <p style={{ color: "#22c55e" }}>
                  🟢 Strengths: {ins.strengths.join(", ") || "None"}
                </p>

                <p style={{ color: "#ef4444" }}>
                  🔴 Weaknesses: {ins.weaknesses.join(", ") || "None"}
                </p>

                <button
                  style={styles.editBtn}
                  onClick={() => startEdit(p)}
                >
                  ✏️ Edit
                </button>

                <button
                  style={styles.deleteBtn}
                  onClick={() => deletePlayer(p.id)}
                >
                  ❌ Delete
                </button>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

const styles = {
  page: {
    padding: "25px",
    background: "linear-gradient(135deg, #0f172a, #020617)",
    color: "#fff",
    minHeight: "100vh"
  },

  title: {
    fontSize: "28px",
    fontWeight: "800",
    marginBottom: "20px",
    color: "#38bdf8"
  },

  filterRow: {
    display: "flex",
    gap: "15px",
    marginBottom: "20px"
  },

  card: {
    background: "linear-gradient(135deg, #111827, #0b1220)",
    padding: "20px",
    borderRadius: "16px",
    marginBottom: "20px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.4)"
  },

  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "10px",
    borderRadius: "10px",
    border: "1px solid #334155",
    background: "#1f2937",
    color: "#fff"
  },

  editBtn: {
    background: "#38bdf8",
    border: "none",
    padding: "10px 15px",
    borderRadius: "10px",
    cursor: "pointer",
    marginRight: "10px"
  },

  deleteBtn: {
    background: "#ef4444",
    border: "none",
    padding: "10px 15px",
    borderRadius: "10px",
    cursor: "pointer"
  },

  saveBtn: {
    background: "#22c55e",
    border: "none",
    padding: "12px",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer"
  }
};