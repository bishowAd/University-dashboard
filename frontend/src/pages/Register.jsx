import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../api/axios";
import Input from "../components/Input";

export default function Register({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    if (!name || !email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/register", {
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
      });
      onLogin(res.data.token, res.data.name);
    } catch {
      setError("Registration failed. Email may already exist.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>Join the university dashboard</p>

        {error && <p style={styles.error}>{error}</p>}

        <Input
          type="text"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleRegister()}
        />
        <Input
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleRegister()}
        />
        <Input
          type="password"
          placeholder="Password (min 6 characters)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleRegister()}
        />

        <button
          style={{ ...styles.button, opacity: loading ? 0.7 : 1 }}
          onClick={handleRegister}
          disabled={loading}
        >
          {loading ? "Creating account..." : "Create Account"}
        </button>

        <p style={styles.link}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
}

Register.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #1a237e, #283593)",
  },
  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "12px",
    width: "100%",
    maxWidth: "400px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
  },
  title: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#1a237e",
    marginBottom: "6px",
  },
  subtitle: {
    color: "#666",
    marginBottom: "24px",
    fontSize: "14px",
  },
  button: {
    width: "100%",
    padding: "12px",
    background: "#1a237e",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    fontWeight: "600",
    marginTop: "6px",
    cursor: "pointer",
  },
  error: {
    color: "#e53935",
    fontSize: "13px",
    marginBottom: "12px",
    padding: "8px 12px",
    background: "#ffebee",
    borderRadius: "6px",
  },
  link: {
    textAlign: "center",
    marginTop: "16px",
    fontSize: "13px",
    color: "#666",
  },
};
