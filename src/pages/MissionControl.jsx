import { useEffect, useState } from "react";
import Card from "../components/Card";
import db from "../firebase/firestore";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";

function MissionControl() {
  const [robot, setRobot] = useState({
    robot: "Offline",
    battery: 0,
    temperature: 0,
    gps: "Disconnected",
    command: "Idle",
    commandStatus: "Waiting",
  });

  const [sending, setSending] = useState(false);

  useEffect(() => {
    const ref = doc(db, "robot", "status");

    const unsubscribe = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        setRobot(snap.data());
      }
    });

    return () => unsubscribe();
  }, []);

  async function sendCommand(command) {
    setSending(true);

    try {
      const ref = doc(db, "robot", "status");

      await updateDoc(ref, {
        command: command,
        commandStatus: "Sent",
      });
    } catch (error) {
      console.error("Command error:", error);
      alert("Could not send command.");
    }

    setSending(false);
  }

  return (
    <div style={{ color: "white" }}>
      <h1 style={{ fontSize: "36px" }}>🎯 Mission Control</h1>

      <Card title="🤖 Robot Status">
        <p>
          Status:{" "}
          <strong style={{ color: "#22c55e" }}>
            {robot.robot}
          </strong>
        </p>

        <p>🔋 Battery: {robot.battery}%</p>
        <p>🌡 Temperature: {robot.temperature}°C</p>
        <p>📍 GPS: {robot.gps}</p>
        <p>🎮 Current Command: {robot.command}</p>
        <p>📡 Command Status: {robot.commandStatus}</p>
      </Card>

      <Card title="🎮 Mission Commands">
        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            marginTop: "20px",
          }}
        >
          <button
            onClick={() => sendCommand("Start Mission")}
            disabled={sending}
            style={buttonStyle("#16a34a")}
          >
            🚀 Start Mission
          </button>

          <button
            onClick={() => sendCommand("Stop Mission")}
            disabled={sending}
            style={buttonStyle("#dc2626")}
          >
            🛑 Stop Mission
          </button>

          <button
            onClick={() => sendCommand("Return Home")}
            disabled={sending}
            style={buttonStyle("#2563eb")}
          >
            🏠 Return Home
          </button>

          <button
            onClick={() => sendCommand("Emergency Stop")}
            disabled={sending}
            style={buttonStyle("#991b1b")}
          >
            🚨 Emergency Stop
          </button>
        </div>

        {sending && (
          <p style={{ marginTop: "20px", color: "#60a5fa" }}>
            📡 Sending command...
          </p>
        )}
      </Card>
    </div>
  );
}

function buttonStyle(background) {
  return {
    background,
    color: "white",
    border: "none",
    padding: "14px 22px",
    borderRadius: "12px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
  };
}

export default MissionControl;