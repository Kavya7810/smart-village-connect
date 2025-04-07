import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import successSound from "../assets/sounds/success.mp3";
import errorSound from "../assets/sounds/error.mp3";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  const navigate = useNavigate();

  const playSound = (soundFile) => {
    const audio = new Audio(soundFile);
    audio.play();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsSuccess(null);

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);
        localStorage.setItem("email", data.email);

        setMessage("✅ Login Successful!");
        setIsSuccess(true);
        playSound(successSound);

        // Redirect based on role
        setTimeout(() => {
          if (data.role === "Doctor") navigate("/doctor");
          else if (data.role === "Farmer") navigate("/farmer");
          else if (data.role === "Admin") navigate("/admin");
          else navigate("/services"); // Default fallback
        }, 2000);
      } else {
        setMessage(data.message || "❌ Invalid Credentials!");
        setIsSuccess(false);
        playSound(errorSound);
      }
    } catch (error) {
      setMessage("⚠️ Server Error! Try again later.");
      setIsSuccess(false);
      playSound(errorSound);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        {message && (
          <p className={`message ${isSuccess ? "success-message" : "error-message"}`}>
            {message}
          </p>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <select
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="" disabled>
              Select Role
            </option>
            <option value="Doctor">Doctor</option>
            <option value="Farmer">Farmer</option>
            <option value="Villager">Villager</option>
            <option value="Admin">Admin</option>
          </select>
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
