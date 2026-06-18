import { Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Players from "./pages/Players";
import EvaluationForm from "./components/EvaluationForm";
import Reports from "./pages/Reports";

export default function App() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "20px",
          background: "#000",
          minHeight: "100vh",
          color: "#fff"
        }}
      >
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/players" element={<Players />} />
          <Route path="/evaluate" element={<EvaluationForm />} />
          <Route path="/reports" element={<Reports />} />
        </Routes>
      </div>
    </div>
  );
}