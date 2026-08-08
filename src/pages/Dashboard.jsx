import { useEffect, useState } from "react";

import Camera from "./Camera";
import Overview from "./Overview";
import GPS from "./GPS";
import Robot from "./Robot";
import Reports from "./Reports";
import Battery from "./Battery";
import Controls from "./Controls";

import ActivityFeed from "../components/ActivityFeed";
import EmergencyPopup from "../components/EmergencyPopup";

import db from "../firebase/firestore";
import { doc, onSnapshot } from "firebase/firestore";

function Dashboard() {
  const [popup, setPopup] = useState(null);

  const [robot, setRobot] = useState({
    robot: "Offline",
    gps: "Disconnected",
    battery: 0,
    temperature: 0,
    alerts: 0,
  });

  useEffect(() => {
    const ref = doc(db, "robot", "status");

    const unsubscribe = onSnapshot(
      ref,
      (snap) => {
        if (!snap.exists()) return;

        const data = snap.data();

        setRobot({
          robot: data.robot ?? "Offline",
          gps: data.gps ?? "Disconnected",
          battery: data.battery ?? 0,
          temperature: data.temperature ?? 0,
          alerts: data.alerts ?? 0,
        });

        if (data.helmetMissing > 0) {
          setPopup({
            title: "🚨 HELMET ALERT",
            message: `${data.helmetMissing} worker(s) detected without a helmet.`,
          });
          return;
        }

        if (data.temperature > 60) {
          setPopup({
            title: "🔥 HIGH TEMPERATURE",
            message: `Robot temperature is ${data.temperature}°C.`,
          });
          return;
        }

        if (data.battery < 20) {
          setPopup({
            title: "🔋 LOW BATTERY",
            message: `Battery remaining: ${data.battery}%. Charging is required.`,
          });
          return;
        }

        if (data.gps === "Disconnected") {
          setPopup({
            title: "📍 GPS DISCONNECTED",
            message: "The robot GPS connection has been lost.",
          });
          return;
        }

        setPopup(null);
      },
      (error) => {
        console.error("Dashboard Firestore Error:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <div style={{ minHeight: "100vh", color: "white" }}>
      <h1 style={{ fontSize: "42px" }}>
        🛡️ Dhruv Rakshak
      </h1>

      <h2>AI Industrial Safety Platform</h2>

      <div
        style={{
          marginTop: "20px",
          marginBottom: "25px",
          background: "#1E3A8A",
          padding: "18px",
          borderRadius: "12px",
          borderLeft: "6px solid #60A5FA",
          fontWeight: "bold",
        }}
      >
        🔔 System Ready — Waiting for Raspberry Pi connection...
      </div>

      <Overview />

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginTop: "25px",
          marginBottom: "30px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            background: "#16a34a",
            padding: "14px 22px",
            borderRadius: "12px",
            fontWeight: "bold",
          }}
        >
          🤖 Robot {robot.robot}
        </div>

        <div
          style={{
            background: "#2563eb",
            padding: "14px 22px",
            borderRadius: "12px",
            fontWeight: "bold",
          }}
        >
          📍 GPS {robot.gps}
        </div>

        <div
          style={{
            background:
              robot.battery < 20 ? "#dc2626" : "#ca8a04",
            padding: "14px 22px",
            borderRadius: "12px",
            fontWeight: "bold",
          }}
        >
          🔋 {robot.battery}% Battery
        </div>

        <div
          style={{
            background:
              robot.alerts > 0 ? "#dc2626" : "#16a34a",
            padding: "14px 22px",
            borderRadius: "12px",
            fontWeight: "bold",
          }}
        >
          🚨 {robot.alerts} Alerts
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "20px",
        }}
      >
        <Robot />
        <Battery />
        <GPS />
        <Camera />
        <Reports />
        <Controls />
        <ActivityFeed />
      </div>

      <EmergencyPopup
        popup={popup}
        onClose={() => setPopup(null)}
      />
    </div>
  );
}

export default Dashboard;