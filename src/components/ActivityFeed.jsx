import { useEffect, useState } from "react";
import Card from "./Card";

import db from "../firebase/firestore";

import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";

function ActivityFeed() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const activitiesRef = collection(db, "activity");

    const q = query(
      activitiesRef,
      orderBy("timestamp", "desc"),
      limit(10)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setActivities(data);
      },
      (error) => {
        console.error("Activity Feed Error:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <Card title="📋 Live Activity Feed">
      {activities.length === 0 ? (
        <p style={{ color: "#94a3b8" }}>
          No activity recorded yet.
        </p>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {activities.map((activity) => (
            <div
              key={activity.id}
              style={{
                background: "#1e293b",
                padding: "12px 15px",
                borderRadius: "10px",
                borderLeft: "4px solid #2563eb",
              }}
            >
              <div style={{ fontWeight: "bold" }}>
                {activity.command || "System Event"}
              </div>

              <div
                style={{
                  color: "#94a3b8",
                  fontSize: "13px",
                  marginTop: "4px",
                }}
              >
                {activity.status || "Recorded"}
              </div>

              {activity.timestamp?.toDate && (
                <div
                  style={{
                    color: "#64748b",
                    fontSize: "12px",
                    marginTop: "5px",
                  }}
                >
                  {activity.timestamp
                    .toDate()
                    .toLocaleString("en-IN")}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}

export default ActivityFeed;