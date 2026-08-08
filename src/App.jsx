import { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from "./services/auth";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Camera from "./pages/Camera";
import Reports from "./pages/Reports";
import GPS from "./pages/GPS";
import Robot from "./pages/Robot";
import Settings from "./pages/Settings";
import MissionControl from "./pages/MissionControl";

import Sidebar from "./components/Sidebar";
import TopBar from "./components/TopBar";

import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedIn(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          background: "#111827",
          color: "white",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        Loading Dhruv Rakshak...
      </div>
    );
  }

  if (!loggedIn) {
    return <Login onLoginSuccess={() => setLoggedIn(true)} />;
  }

  return (
    <div
      style={{
        display: "flex",
        background: "#111827",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          marginLeft: "240px",
          padding: "25px",
          boxSizing: "border-box",
        }}
      >
        <TopBar />

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "20px",
          }}
        >
          <button
            onClick={() => signOut(auth)}
            style={{
              background: "#dc2626",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Logout
          </button>
        </div>

        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path="/mission" element={<MissionControl />} />

          <Route path="/camera" element={<Camera />} />

          <Route path="/robot" element={<Robot />} />

          <Route path="/gps" element={<GPS />} />

          <Route path="/reports" element={<Reports />} />

          <Route path="/settings" element={<Settings />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;