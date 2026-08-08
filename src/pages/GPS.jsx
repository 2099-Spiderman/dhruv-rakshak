import { useEffect, useState } from "react";
import Card from "../components/Card";
import db from "../firebase/firestore";
import { doc, onSnapshot } from "firebase/firestore";

function GPS() {
  const [robot, setRobot] = useState({
    gps: "Loading...",
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
    <Card title="📍 GPS Status">
      <p>Status: {robot.gps}</p>

      <p>Latitude: 17.3850°</p>

      <p>Longitude: 78.4867°</p>
    </Card>
  );
}

export default GPS;