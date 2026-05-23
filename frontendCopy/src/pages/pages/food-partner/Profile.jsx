import React, { useEffect, useState } from "react";
import "../../styles/style.css";
import "../../styles/reel.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
  const [activeVideo, setActiveVideo] = useState(null);
  const { id } = useParams();
  const [profile, setprofile] = useState(null);
  const [videos, setvideos] = useState([]);
  useEffect(() => {
    axios
      .get(`https://mealreel.onrender.com/api/food-partner/${id}`, {
        withCredentials: true,
      })
      .then((response) => {
        setprofile(response.data.foodPartner);
        setvideos(response.data.foodPartner.foodItems);
      });
  }, [id]);

  // dummy videos

  return (
    <>
      {/* ===== Store Profile ===== */}
      <div className="store-profile">
        {/* Header */}
        <div className="store-header">
          <div className="store-avatar"></div>

          <div className="store-info">
            <h2 className="store-name">{profile?.name}</h2>
            <p className="store-address">{profile?.address}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="store-stats">
          <div>
            <span className="stat-number">{profile?.totalMeals}</span>
            <span className="stat-label">Total Meals</span>
          </div>
          <div>
            <span className="stat-number">{profile?.customerServed}</span>
            <span className="stat-label">Customers Served</span>
          </div>
        </div>

        {/* Video Grid */}
        <div className="video-grid">
          {videos.map((_, index) => (
            <div
              key={index}
              className="video-tile"
              onClick={() => setActiveVideo(index)}
            >
              <video
                className="video-tile"
                src={_.video}
                muted
                autoPlay
              ></video>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Full Screen Reel View ===== */}
      {activeVideo !== null && (
        <div className="reel-fullscreen" onClick={() => setActiveVideo(null)}>
          <video
            src="https://ik.imagekit.io/0ym6xth4s/52cf1572-8e39-4120-800e-ebe929b9545d_QwRWriu46"
            autoPlay
            loop
            controls
          />
        </div>
      )}
    </>
  );
};

export default Profile;
