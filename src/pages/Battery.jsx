import { useEffect, useState } from "react";
import Card from "../components/Card";
import db from "../firebase/firestore";
import { doc, onSnapshot } from "firebase/firestore";

function Battery() {
  const [battery, setBattery] = useState({
    battery: 0,
  });

  const [robot, setRobot] = useState({
    robot: "Loading...",
    gps: "Loading...",
    battery: 5,
    temperature: 0,
    alerts: 0,
  });

  useEffect(() => {
    const ref = doc(db, "robot", "status");

    const unsubscribe = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        setBattery(snap.data());
        setRobot(snap.data());
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Card title="🔋 Battery Health">
      <p>Battery: {robot.battery}%</p>
      <p>Charging: No</p>
      <p>
        Estimated Time Left:{" "}
        {battery.battery > 75
          ? "4h 35m"
          : battery.battery > 50
          ? "2h 45m"
          : battery.battery > 25
          ? "1h 20m"
          : "30m"}
      </p>
    </Card>
  );
}

export default Battery;