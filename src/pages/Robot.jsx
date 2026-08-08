import { useEffect, useState } from "react";
import Card from "../components/Card";
import db from "../firebase/firestore";
import { doc, onSnapshot } from "firebase/firestore";

function Robot() {
  const [robot, setRobot] = useState({
    robot: "Loading...",
    battery: 0,
    temperature: 0,
  });

  useEffect(() => {
    const ref = doc(db, "robot", "status");

    const unsubscribe = onSnapshot(ref, (snap) => {
      if (snap.exists()) {
        setRobot(snap.data());
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Card title="🤖 Robot Status">
      <p>
        Status:{" "}
        <span style={{ color: "#22c55e" }}>
          {robot.robot}
        </span>
      </p>

      <p>Battery: {robot.battery}%</p>

      <p>Temperature: {robot.temperature}°C</p>
    </Card>
  );
}

export default Robot;