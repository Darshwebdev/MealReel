import React, { useState, useEffect } from "react";
import "../../styles/profile.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {

  const { id } = useParams();

  const [profile, setProfile] = useState(null);
  const [videos, setVideos] = useState([]);

  useEffect(() => {

    axios.get(`http://localhost:3000/api/food-partner/${id}`, {
      withCredentials: true
    })
    .then((res) => {
      setProfile(res.data.foodPartner);
      setVideos(res.data.foods || []);
    })
    .catch((err) => console.log(err));

  }, [id]);

  const categories = [...new Set(videos.map(v => v.category))];

  const mostExpensive =
    videos.length > 0
      ? Math.max(...videos.map(v => v.price))
      : 0;

  return (
    <main className="profile-page">

      {/* HEADER */}
      <section className="profile-header">


        <h1 className="profile-name">
          {profile?.name}
        </h1>

        <p className="profile-email">
          {profile?.email}
        </p>

        <div className="profile-stats">

          <div>
            <h2>{videos.length}</h2>
            <p>Uploads</p>
          </div>

          <div>
            <h2>{categories.length}</h2>
            <p>Categories</p>
          </div>

          <div>
            <h2>₹{mostExpensive}</h2>
            <p>Top Dish</p>
          </div>

        </div>

      </section>

      {/* GRID */}

      {videos.length === 0 ? (
        <div className="empty-profile">
          <h3>No uploads yet 🍜</h3>
        </div>
      ) : (

        <section className="profile-grid">

          {videos.map((v) => (

            <div key={v._id} className="food-card">

              <video
                src={v.video}
                muted
                loop
                playsInline
                className="food-video"
              />

              <div className="food-info">
                <h4>{v.name}</h4>
                <p>₹{v.price}</p>
              </div>

            </div>

          ))}

        </section>
      )}

    </main>
  );
};

export default Profile;