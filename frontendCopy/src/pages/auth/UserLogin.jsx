import React, { useState } from "react";
import "../../styles/style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const UserLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Reset previous errors
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://mealreel.onrender.com/api/auth/user/login",
        { email, password },
        { withCredentials: true },
      );

      // console.log(response.data);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      navigate("/");
    } catch (err) {
      // Handle different error scenarios
      if (err.response?.status === 400) {
        setError("Invalid email or password. Please try again.");
      } else if (err.response?.status === 401) {
        setError("Authentication failed. Check your credentials.");
      } else if (!err.response) {
        setError("Network error. Please check your connection.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="form-box premium-card">
        <div className="top-icon">Login</div>

        <div className="toggle-tabs">
          <a href="/user/login" className="tab active">
            User Login
          </a>
          <a href="/food-partner/login" className="tab">
            Food Partner Login
          </a>
        </div>

        <p className="sub-text">Welcome back, login to continue.</p>

        {error && (
          <div
            className="error-message"
            style={{
              backgroundColor: "#fee",
              color: "#c33",
              padding: "12px",
              borderRadius: "8px",
              border: "1px solid #fcc",
              marginBottom: "16px",
              fontSize: "14px",
            }}
          >
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="input-icon">✉️</span>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              disabled={isLoading}
            />
          </div>

          <div className="input-group">
            <span className="input-icon">🔒</span>
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className="register-btn"
            disabled={isLoading}
            style={{ opacity: isLoading ? 0.7 : 1 }}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-link">
          Don't have an account? <a href="/user/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default UserLogin;
