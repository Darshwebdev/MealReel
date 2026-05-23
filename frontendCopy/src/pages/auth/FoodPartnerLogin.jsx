import React, { useState } from "react";
import "../../styles/style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FoodPartnerLogin = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Store food partner data
  const storeFoodPartner = (partnerData) => {
    localStorage.setItem("foodPartner", JSON.stringify(partnerData));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // Reset previous errors
    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://mealreel.onrender.com/api/auth/food-partner/login",
        { email, password },
        { withCredentials: true },
      );

      // Store in localStorage and navigate
      storeFoodPartner(response.data.foodPartner);
      // console.log(response.data);
      navigate("/create-food");
    } catch (err) {
      // Handle different error scenarios (same as UserLogin)
      if (err.response?.status === 400) {
        setError("Invalid business email or password. Please try again.");
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
          <a href="/user/login" className="tab">
            User login
          </a>
          <a href="/food-partner/login" className="tab active">
            Food Partner Login
          </a>
        </div>

        <p className="sub-text">Manage your business and orders easily.</p>

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
              placeholder="Business Email"
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
          Don't have an account? <a href="/food-partner/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default FoodPartnerLogin;
