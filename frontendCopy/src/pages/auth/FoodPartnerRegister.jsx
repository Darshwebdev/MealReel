import React from 'react';
import "../../styles/style.css";  // ✅ Changed from auth-shared.css
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FoodPartnerRegister = () => {
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const contactName = e.target.contactName.value;
    const phone = e.target.phone.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const address = e.target.address.value;

    const response = await axios.post("http://localhost:3000/api/auth/food-partner/register", {
      name,
      contactName,
      phone,
      email,
      password,
      address
    }, { 
      withCredentials: true 
    });

    // console.log(response.data);
    navigate("/create-food");
  };

  return (
    <div className="page-container">  {/* ✅ Changed from auth-page-wrapper */}
      <div className="form-box premium-card">  {/* ✅ Changed from auth-card */}
        
        {/* Top icon */}
        <div className="top-icon">Register</div>

        {/* Toggle tabs */}
        <div className="toggle-tabs">
          <a href="/user/register" className="tab">User Register</a>
          <a href="/food-partner/register" className="tab active">FoodPartner Register</a>
        </div>

        <p className="sub-text">Grow your business with our platform.</p>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <span className="input-icon">🏷️</span>
            <input
              type="text"
              name="name"
              placeholder="Business Name"
              required
            />
          </div>

          <div className="row-inputs">  {/* ✅ Row for contactName + phone */}
            <div className="input-group">
              <span className="input-icon">👤</span>
              <input
                type="text"
                name="contactName"
                placeholder="Contact Name"
                required
              />
            </div>

            <div className="input-group">
              <span className="input-icon">📞</span>
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <span className="input-icon">✉️</span>
            <input
              type="email"
              name="email"
              placeholder="Business Email"
              required
            />
          </div>

          <div className="input-group">
            <span className="input-icon">🔒</span>
            <input
              type="password"
              name="password"
              placeholder="Create password"
              required
            />
          </div>

          <div className="input-group">
            <span className="input-icon">📍</span>
            <input
              type="text"
              name="address"
              placeholder="Business Address"
              required
            />
          </div>

          <span className="hint-text">
            Full address helps customers find you faster.
          </span>

          <button type="submit" className="register-btn">
            Create Partner Account
          </button>
        </form>

        <p className="text-link">
          Already a partner? <a href="/food-partner/login">Sign in</a>
        </p>
      </div>
    </div>
  );
};

export default FoodPartnerRegister;
