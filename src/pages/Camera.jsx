import Card from "../components/Card";

function Camera() {
  return (
    <Card title="📷 Live Camera Feed">
      <div
        style={{
          height: "180px",
          background: "#0f172a",
          border: "2px dashed #3b82f6",
          borderRadius: "12px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#60a5fa",
          fontSize: "18px",
        }}
      >
        Camera Offline
      </div>
    </Card>
  );
}

export default Camera;