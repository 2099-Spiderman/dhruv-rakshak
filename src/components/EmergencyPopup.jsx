function EmergencyPopup({ popup, onClose }) {
  if (!popup) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(120, 0, 0, 0.92)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "30px",
        animation: "alertFlash 0.8s infinite alternate",
      }}
    >
      <div
        style={{
          width: "min(700px, 90vw)",
          background: "#111827",
          border: "5px solid #ef4444",
          borderRadius: "25px",
          padding: "45px",
          textAlign: "center",
          boxShadow: "0 0 60px rgba(239, 68, 68, 0.8)",
        }}
      >
        <div
          style={{
            fontSize: "80px",
            marginBottom: "15px",
          }}
        >
          🚨
        </div>

        <h1
          style={{
            color: "#ef4444",
            fontSize: "42px",
            margin: "0 0 20px",
            fontWeight: "900",
          }}
        >
          {popup.title}
        </h1>

        <p
          style={{
            color: "white",
            fontSize: "24px",
            lineHeight: "1.5",
            marginBottom: "35px",
          }}
        >
          {popup.message}
        </p>

        <button
          onClick={onClose}
          style={{
            background: "#ef4444",
            color: "white",
            border: "none",
            padding: "16px 40px",
            borderRadius: "12px",
            fontSize: "20px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          ACKNOWLEDGE ALERT
        </button>
      </div>

      <style>
        {`
          @keyframes alertFlash {
            from {
              background: rgba(120, 0, 0, 0.88);
            }
            to {
              background: rgba(220, 38, 38, 0.96);
            }
          }
        `}
      </style>
    </div>
  );
}

export default EmergencyPopup;