import { useEffect, useState } from "react";
import Card from "../components/Card";
import db from "../firebase/firestore";
import { doc, onSnapshot } from "firebase/firestore";

function Overview() {
  console.log("Overview component loaded");

  const [robot, setRobot] = useState({
    robot: "Loading...",
    gps: "Loading...",
    battery: 0,
    temperature: 0,
    alerts: 0,
  });

  useEffect(() => {
    const ref = doc(db, "robot", "status");

    const unsubscribe = onSnapshot(
      ref,
      (snap) => {
        console.log("Document exists:", snap.exists());

        if (snap.exists()) {
          console.log("Firestore data:", snap.data());
          setRobot(snap.data());
        }
      },
      (error) => {
        console.error("Firestore Error:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <Card title="📊 System Overview">
      <p>🤖 Robot: {robot.robot}</p>
      <p>📍 GPS: {robot.gps}</p>
      <p>🔋 Battery: {robot.battery}%</p>
      <p>🌡 Temperature: {robot.temperature}°C</p>
      <p>🚨 Alerts: {robot.alerts}</p>
    </Card>
  );
}

export default Overview;