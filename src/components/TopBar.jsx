import { useEffect, useState } from "react";

function TopBar() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const currentTime = time.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const currentDate = time.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div
      style={{
        width: "100%",
        minHeight: "75px",
        background: "#1e293b",
        borderBottom: "1px solid #334155",
        borderRadius: "15px",
        marginBottom: "25px",
        padding: "15px 25px",
        boxSizing: "border-box",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "20px",
      }}
    >
      <div>
        <div
          style={{
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          🛡️ DHRUV RAKSHAK
        </div>

        <div
          style={{
            color: "#94a3b8",
            fontSize: "13px",
            marginTop: "4px",
          }}
        >
          AI Industrial Safety Platform
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "25px",
        }}
      >
        <div
          style={{
            color: "#22c55e",
            fontWeight: "bold",
          }}
        >
          🟢 SYSTEM ONLINE
        </div>

        <div style={{ textAlign: "right" }}>
          <div
            style={{
              fontSize: "22px",
              fontWeight: "bold",
            }}
          >
            {currentTime}
          </div>

          <div
            style={{
              color: "#94a3b8",
              fontSize: "12px",
            }}
          >
            {currentDate}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;