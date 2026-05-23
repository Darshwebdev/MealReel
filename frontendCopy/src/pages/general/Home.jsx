import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/reel.css";
import ReelFeed from "../../components/ReelFeed";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  /* ================= AUTH HELPERS ================= */

  const isAuthenticated = () => {
    const user = localStorage.getItem("user");
    const foodPartner = localStorage.getItem("foodPartner");
    return !!(user || foodPartner);
  };

  const showLoginError = () => {
    toast.error("Please login first to continue 🔒", {
      style: {
        background: "#111",
        color: "#fff",
        border: "1px solid #f2995a",
      },
    });
    navigate("/user/login");
  };

  const handleShopNow = (foodId) => {
    if (isAuthenticated()) {
      navigate(`/checkout/${foodId}`);
    } else {
      showLoginError();
    }
  };

  /* ================= FETCH VIDEOS ================= */

  useEffect(() => {
    axios
      .get("https://mealreel.onrender.com/api/food", { withCredentials: true })
      .then((response) => {
        setVideos(response.data.foodItems);
      })
      .catch(() => {});
  }, []);

  /* ================= ACTIONS ================= */

  async function likeVideo(item) {
    const response = await axios.post(
      "https://mealreel.onrender.com/api/food/like",
      { foodId: item._id },
      { withCredentials: true },
    );

    if (response.data.like) {
      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id ? { ...v, likeCount: v.likeCount + 1 } : v,
        ),
      );
    } else {
      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id ? { ...v, likeCount: v.likeCount - 1 } : v,
        ),
      );
    }
  }

  async function saveVideo(item) {
    const response = await axios.post(
      "https://mealreel.onrender.com/api/food/save",
      { foodId: item._id },
      { withCredentials: true },
    );

    if (response.data.save) {
      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id ? { ...v, savesCount: v.savesCount + 1 } : v,
        ),
      );
    } else {
      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id ? { ...v, savesCount: v.savesCount - 1 } : v,
        ),
      );
    }
  }

  /* ================= RENDER ================= */

  return (
    <>
      <ReelFeed
        items={videos}
        onLike={likeVideo}
        onSave={saveVideo}
        onShopNow={handleShopNow}
        emptyMessage="No videos available."
      />

      {/* Bottom Navigation */}
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
              {/* Stylish Hollow M */}
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
    </>
  );
};

export default Home;
