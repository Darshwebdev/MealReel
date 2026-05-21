import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/style.css';  // ✅ Changed to match your new theme CSS

const ChooseRegister = () => {
  return (
    <div className="page-container"> /* ✅ Changed from auth-page-wrapper */
      <div className="form-box premium-card">  /* ✅ Changed from auth-card */
        {/* Top icon */}
        <div className="top-icon">Register</div>

        <p className="sub-text">Pick how you want to join the platform.</p>

        <div style={{display:'flex', flexDirection:'column', gap:'16px'}}>
          <Link 
            to="/user/register" 
            className="register-btn"  /* ✅ Changed from auth-submit */
            style={{textDecoration:'none'}}
          >
            Register as normal user
          </Link>
          <Link 
            to="/food-partner/register" 
            className="register-btn"  /* ✅ Changed from auth-submit */
            style={{
              background:'var(--card-bg)', 
              color:'var(--text-color)', 
              border:'1px solid var(--border-color)',
              textDecoration:'none'
            }}
          >
            Register as food partner
          </Link>
        </div>

        <p className="text-link">  /* ✅ Changed from auth-alt-action */
          Already have an account? <Link to="/user/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default ChooseRegister;