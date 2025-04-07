import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import successSound from "../assets/sounds/success.mp3";
import errorSound from "../assets/sounds/error.mp3";
import "../styles/Auth.css";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "", // Initially empty
  });
  
  
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  // Play sound function
  const playSound = (sound) => {
    const audio = new Audio(sound);
    audio.play();
  };

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission (Send data to backend)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    console.log("Sending Data:", formData); 
    try {
      const response = await fetch("http://localhost:8080/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        playSound(successSound);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(data.message || "Registration failed");
        playSound(errorSound);
      }
    } catch (err) {
      setError("Server error. Please try again later.");
      playSound(errorSound);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {success && <div className="success-message">✅ Registered Successfully!</div>}
        {error && <div className="error-message">❌ {error}</div>}

        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        <select name="role" value={formData.role} onChange={handleChange} required>
          <option value="" disabled>
            Select Role
          </option>
          <option value="Doctor">Doctor</option>
          <option value="Farmer">Farmer</option>
          <option value="Villager">Villager</option>
          <option value="Admin">Admin</option>

        </select>


          <button type="submit">Register</button>
        </form>
        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
