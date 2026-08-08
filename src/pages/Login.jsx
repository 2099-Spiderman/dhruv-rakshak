import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/auth";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onLoginSuccess();
    } catch (err) {
      setError("❌ Invalid email or password");
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      handleLogin();
    }
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        background: "#0f172a",
      }}
    >
      <div
        style={{
          background: "#1e293b",
          padding: "40px",
          borderRadius: "20px",
          width: "350px",
          textAlign: "center",
          boxShadow: "0 0 30px rgba(37,99,235,0.3)",
        }}
      >
        <h1 style={{ color: "white", marginBottom: "10px" }}>
          🛡️ Dhruv Rakshak
        </h1>

        <p style={{ color: "#94a3b8", marginBottom: "25px" }}>
          AI Industrial Safety Platform
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #475569",
            marginBottom: "15px",
            fontSize: "16px",
            boxSizing: "border-box",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #475569",
            marginBottom: "20px",
            fontSize: "16px",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            background: loading ? "#64748b" : "#2563eb",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: loading ? "not-allowed" : "pointer",
            fontWeight: "bold",
            fontSize: "16px",
            transition: "0.3s",
          }}
        >
          {loading ? "⏳ Logging in..." : "🔐 Login"}
        </button>

        {error && (
          <div
            style={{
              marginTop: "20px",
              background: "#7f1d1d",
              color: "#fecaca",
              padding: "12px",
              borderRadius: "10px",
              border: "1px solid #dc2626",
              fontWeight: "bold",
            }}
          >
            {error}
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;