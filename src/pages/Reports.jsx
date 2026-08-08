import { useEffect, useState } from "react";
import Card from "../components/Card";
import db from "../firebase/firestore";
import { doc, onSnapshot } from "firebase/firestore";

function Reports() {
  const [robot, setRobot] = useState({
    helmetMissing: 0,
    restrictedArea: 0,
    emergency: "None",
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
    <Card title="🚨 Safety Alerts">
      <p>Helmet Missing: {robot.helmetMissing}</p>
      <p>Restricted Area: {robot.restrictedArea}</p>
      <p>Emergency: {robot.emergency}</p>
    </Card>
  );
}

export default Reports;