import { useState, useEffect } from "react";

function Navbar() {
  const [currentTime, setCurrentTime] = useState(
    new Date().toLocaleTimeString()
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      style={{
        background: "#1f2937",
        padding: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottom: "2px solid #374151",
        color: "white",
      }}
    >
      <div>
        <h2 style={{ margin: 0 }}>🛡️ Dhruv Rakshak</h2>
        <p style={{ margin: 0, color: "#9CA3AF" }}>
          AI Industrial Safety Platform
        </p>
      </div>

      <div style={{ textAlign: "right" }}>
        <h3 style={{ margin: 0 }}>{currentTime}</h3>
        <p style={{ margin: 0, color: "#22c55e" }}>
          🟢 System Online
        </p>
      </div>
    </div>
  );
}

export default Navbar;