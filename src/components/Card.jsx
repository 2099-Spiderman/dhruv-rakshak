function Card({ title, children }) {
  return (
    <div
      style={{
        background: "linear-gradient(145deg, #1f2937, #111827)",
        padding: "20px",
        borderRadius: "18px",
        width: "300px",
        border: "1px solid #374151",
        boxShadow: "0 0 15px rgba(59,130,246,0.15)",
        transition: "0.3s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.boxShadow =
          "0 0 30px rgba(59,130,246,0.45)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0px)";
        e.currentTarget.style.boxShadow =
          "0 0 15px rgba(59,130,246,0.15)";
      }}
    >
      <h2
        style={{
          marginTop: 0,
          color: "#60A5FA",
        }}
      >
        {title}
      </h2>

      {children}
    </div>
  );
}

export default Card;