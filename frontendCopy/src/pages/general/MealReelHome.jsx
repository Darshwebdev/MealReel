import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import "../../styles/meelreel.css";

const MealReelHome = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
const [role, setRole] = useState(null); // "user" | "foodPartner"

  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const savedTheme = localStorage.getItem("mealreel-theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
  const user = localStorage.getItem("user");
  const foodPartner = localStorage.getItem("foodPartner");

  if (foodPartner) {
    setIsLoggedIn(true);
    setRole("foodPartner");
  } else if (user) {
    setIsLoggedIn(true);
    setRole("user");
  } else {
    setIsLoggedIn(false);
    setRole(null);
  }
}, []);


const navigate = useNavigate();

const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("foodPartner");
  navigate("/");
};


  return (
    <div className={`mealreel ${theme}`}>
      
      {/* Theme Toggle (FAB-style, no collision ever) */}
      <button
        className="theme-toggle"
        onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        aria-label="Toggle theme"
      >
        {theme === "light" ? "🌙" : "☀️"}
      </button>

      {/* HERO */}
      <section className="hero">
        <nav className="navbar">
          <h1 className="logo">MealReel</h1>

          <div className="nav-actions">

  {/* SHOW ONLY WHEN NOT LOGGED IN */}
 <div className="nav-actions">

  {/* NOT LOGGED IN */}
  {!isLoggedIn && (
    <>
      <Link to="/food-partner/register" className="partner-btn">
        Become a food-partner
      </Link>
      <Link to="/user/register" className="signin-btn">
        Sign In
      </Link>
    </>
  )}

  {/* USER LOGGED IN */}
  {isLoggedIn && role === "user" && (
    <button onClick={logout} className="logout-btn">
      Logout
    </button>
  )}

  {/* FOOD PARTNER LOGGED IN */}
  {isLoggedIn && role === "foodPartner" && (
    <>
      <Link to="/create-food" className="upload-btn">
        Upload Video
      </Link>
      <button onClick={logout} className="logout-btn">
        Logout
      </button>
    </>
  )}

</div>


</div>


         </nav>

        <div className="hero-content">
          <h2>Watch food. Feel hungry. Order instantly.</h2>
          <p>
            MealReel lets you watch short food videos and instantly order what
            you crave — entertainment and food, perfectly blended.
          </p>
        </div>
      </section>

      {/* OFFERS */}
      <section className="offers">
        <div className="offer-card">
          <h3>30% OFF</h3>
          <p>Exclusive first-order discount for early users</p>
        </div>

        <div className="offer-card highlight">
          <h3>Zero Delivery Fee</h3>
          <p>Enjoy free delivery on your first 10 orders</p>
        </div>

        <div className="offer-card">
          <h3>Reel-Only Deals</h3>
          <p>Unlock special offers while watching food reels</p>
        </div>
      </section>

     
      {/* Bottom Navigation Bar */}
{!(isLoggedIn && role === "foodPartner") && (
  <nav className="bottom-nav">

    <Link to="/" className="nav-item">
      <svg viewBox="0 0 24 24">
        <path d="M3 12l9-9 9 9v9a1 1 0 01-1 1h-5v-7H9v7H4a1 1 0 01-1-1z" />
      </svg>
      <span>Home</span>
    </Link>

    {/* CENTER LOGO */}
    <Link to="/MealReel" className="nav-item logo-item">
      <div className="logo-circle">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 20V4l6 10 6-10v16" />
        </svg>
      </div>
      <span className="logo-text">MealReel</span>
    </Link>

    <Link to="/saved" className="nav-item">
      <svg viewBox="0 0 24 24">
        <path d="M6 3h12v18l-6-4-6 4z" />
      </svg>
      <span>Saved</span>
    </Link>

  </nav>
)}

    </div>
  );
};

export default MealReelHome;
