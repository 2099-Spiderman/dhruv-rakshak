import { NavLink } from "react-router-dom";

function Sidebar() {
  const linkStyle = ({ isActive }) => ({
    display: "block",
    padding: "14px 18px",
    marginBottom: "12px",
    borderRadius: "12px",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "16px",
    color: "white",
    background: isActive ? "#2563EB" : "#1E293B",
    cursor: "pointer",
  });

  return (
    <div
      style={{
        width: "240px",
        height: "100vh",
        background: "#0F172A",
        position: "fixed",
        left: 0,
        top: 0,
        padding: "25px",
        boxSizing: "border-box",
        borderRight: "2px solid #1E293B",
        zIndex: 99999,
      }}
    >
      <h2
        style={{
          color: "#60A5FA",
          marginBottom: "35px",
          textAlign: "center",
        }}
      >
        🛡️ Dhruv Rakshak
      </h2>

      <NavLink to="/" style={linkStyle}>
        🏠 Dashboard
      </NavLink>

      <NavLink to="/mission" style={linkStyle}>
        🎯 Mission Control
      </NavLink>

      <NavLink to="/camera" style={linkStyle}>
        📷 Camera
      </NavLink>

      <NavLink to="/robot" style={linkStyle}>
        🤖 Robot
      </NavLink>

      <NavLink to="/gps" style={linkStyle}>
        📍 GPS
      </NavLink>

      <NavLink to="/reports" style={linkStyle}>
        📊 Reports
      </NavLink>

      <NavLink to="/settings" style={linkStyle}>
        ⚙️ Settings
      </NavLink>
    </div>
  );
}

export default Sidebar;