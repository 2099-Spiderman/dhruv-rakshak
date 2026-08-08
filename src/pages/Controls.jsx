import { useEffect, useState } from "react";

import Card from "../components/Card";

import db from "../firebase/firestore";

import {
  collection,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  addDoc,
} from "firebase/firestore";

function Controls() {
  const [robot, setRobot] = useState({
    command: "Idle",
    commandStatus: "Waiting",
    lastCommand: "None",
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
    if (sending) return;

    setSending(true);

    try {
      const ref = doc(db, "robot", "status");

      await updateDoc(ref, {
        command: command,
        lastCommand: command,
        commandStatus: "Sent",
      });

      await addDoc(collection(db, "activity"), {
        command: command,
        status: "Command sent",
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.error("Command Error:", error);
    }

    setSending(false);
  }

  return (
    <Card title="🎮 Command Center">
      <p>
        <b>Last Command:</b> {robot.lastCommand || "None"}
      </p>

      <p>
        <b>Status:</b>{" "}
        <span style={{ color: "#22c55e" }}>
          {robot.commandStatus || "Waiting"}
        </span>
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px",
          marginTop: "20px",
        }}
      >
        <button
          disabled={sending}
          onClick={() => sendCommand("Start Patrol")}
        >
          ▶ Start Patrol
        </button>

        <button
          disabled={sending}
          onClick={() => sendCommand("Return Home")}
        >
          🏠 Return Home
        </button>

        <button
          disabled={sending}
          onClick={() => sendCommand("Charging Dock")}
        >
          🔋 Charging Dock
        </button>

        <button
          disabled={sending}
          onClick={() => sendCommand("Take Picture")}
        >
          📷 Take Picture
        </button>

        <button
          disabled={sending}
          onClick={() => sendCommand("Stop")}
        >
          ⏹ Stop
        </button>

        <button
          disabled={sending}
          onClick={() => sendCommand("Emergency Stop")}
          style={{
            background: "#dc2626",
            color: "white",
            fontWeight: "bold",
          }}
        >
          🚨 EMERGENCY STOP
        </button>
      </div>
    </Card>
  );
}

export default Controls;