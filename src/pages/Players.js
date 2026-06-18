import { useEffect, useState } from "react";

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

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("players")) || [];
    setPlayers(data);
  }, []);

  const deletePlayer = (id) => {
    const updated = players.filter((p) => p.id !== id);
    localStorage.setItem("players", JSON.stringify(updated));
    setPlayers(updated);
  };

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

  const saveEdit = () => {
    const rating = (
      (
        Number(form.gameAwareness) +
        Number(form.decisionMaking) +
        Number(form.pressureHandling) +
        Number(form.adaptability) +
        Number(form.competitiveness) +
        Number(form.coachability)
      ) / 6
    ).toFixed(1);

    const updated = players.map((p) =>
      p.id === editingId
        ? {
            ...p,
            ...form,
            rating: Number(rating)
          }
        : p
    );

    localStorage.setItem("players", JSON.stringify(updated));
    setPlayers(updated);
    setEditingId(null);
  };

  const filteredPlayers = players.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesRole =
      roleFilter === "All" || p.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>👤 Players Database</h1>

      <div style={styles.filterRow}>
        <input
          type="text"
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

      {filteredPlayers.map((p) => (
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

              <input
                style={styles.input}
                type="number"
                max="10"
                value={form.gameAwareness}
                onChange={(e) =>
                  handleSkillChange("gameAwareness", e.target.value)
                }
                placeholder="Game Awareness"
              />

              <input
                style={styles.input}
                type="number"
                max="10"
                value={form.decisionMaking}
                onChange={(e) =>
                  handleSkillChange("decisionMaking", e.target.value)
                }
                placeholder="Decision Making"
              />

              <input
                style={styles.input}
                type="number"
                max="10"
                value={form.pressureHandling}
                onChange={(e) =>
                  handleSkillChange("pressureHandling", e.target.value)
                }
                placeholder="Pressure Handling"
              />

              <input
                style={styles.input}
                type="number"
                max="10"
                value={form.adaptability}
                onChange={(e) =>
                  handleSkillChange("adaptability", e.target.value)
                }
                placeholder="Adaptability"
              />

              <input
                style={styles.input}
                type="number"
                max="10"
                value={form.competitiveness}
                onChange={(e) =>
                  handleSkillChange("competitiveness", e.target.value)
                }
                placeholder="Competitiveness"
              />

              <input
                style={styles.input}
                type="number"
                max="10"
                value={form.coachability}
                onChange={(e) =>
                  handleSkillChange("coachability", e.target.value)
                }
                placeholder="Coachability"
              />

              <button style={styles.saveBtn} onClick={saveEdit}>
                💾 Save Changes
              </button>
            </>
          ) : (
            <>
              <h2>{p.name}</h2>

              <p>Age: {p.age}</p>
              <p>Role: {p.role}</p>

              <p>Game Awareness: {p.gameAwareness}</p>
              <p>Decision Making: {p.decisionMaking}</p>
              <p>Pressure Handling: {p.pressureHandling}</p>
              <p>Adaptability: {p.adaptability}</p>
              <p>Competitiveness: {p.competitiveness}</p>
              <p>Coachability: {p.coachability}</p>

              <h3>⭐ Overall Rating: {p.rating}/10</h3>

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
      ))}
    </div>
  );
}

const styles = {
  page: {
    padding: "25px",
    background: "#000",
    color: "#fff",
    minHeight: "100vh"
  },

  title: {
    marginBottom: "20px"
  },

  filterRow: {
    display: "flex",
    gap: "15px",
    marginBottom: "20px"
  },

  card: {
    background: "#111827",
    padding: "20px",
    borderRadius: "15px",
    marginBottom: "20px"
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
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "10px",
    marginRight: "10px",
    cursor: "pointer"
  },

  deleteBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "10px 15px",
    borderRadius: "10px",
    cursor: "pointer"
  },

  saveBtn: {
    background: "#22c55e",
    color: "#fff",
    border: "none",
    padding: "12px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "bold"
  }
};