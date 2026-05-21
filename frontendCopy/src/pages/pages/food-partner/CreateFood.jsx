import React, { useRef, useState } from "react";
import "../../styles/style.css";
import axios from "axios";
import { useNavigate,Link } from "react-router-dom";

const CreateFood = () => {
  const fileRef = useRef(null);
  const navigate = useNavigate();

  const [videoPreview, setVideoPreview] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState(""); // ✅ NEW

  const handleFile = (file) => {
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const removeVideo = (e) => {
    e.stopPropagation();
    setVideoFile(null);
    setVideoPreview(null);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", desc);
    formData.append("price", price); // ✅ SEND PRICE
    formData.append("video", videoFile);
try {
  const response = await axios.post(
      "http://localhost:3000/api/food",
      formData,
      { withCredentials: true }
    );
  // console.log(response.data);
  navigate("/MealReel");
} catch (error) {
  console.error("Upload failed:", error.response?.data || error.message);
  // Show user-friendly alert, e.g., "Please log in to upload"
}
  }

  return (
    <>
    <form onSubmit={onSubmit}>
      <div className="page-container">
        <div className="form-box">
          <h2>Create Food</h2>
          <p className="form-subtitle">
            Upload a short video, give it a name, and add a description.
          </p>

          {/* Upload */}
          <div
            className={`upload-box enhanced ${dragActive ? "drag-active" : ""}`}
            onClick={() => fileRef.current.click()}
            onDragOver={(e) => {
              e.preventDefault();
              setDragActive(true);
            }}
            onDragLeave={() => setDragActive(false)}
            onDrop={handleDrop}
          >
            {!videoPreview ? (
              <div className="upload-inner">
                <p className="upload-text">Tap to upload or drag & drop</p>
                <span className="upload-hint">
                  MP4, WebM, MOV • up to 100MB
                </span>
              </div>
            ) : (
              <div className="video-preview-wrapper">
                <video
                  src={videoPreview}
                  controls
                  className="video-preview"
                />
                <button
                  type="button"
                  className="remove-video-btn"
                  onClick={removeVideo}
                >
                  Remove
                </button>
              </div>
            )}

            <input
              ref={fileRef}
              type="file"
              accept="video/*"
              hidden
              onChange={(e) => handleFile(e.target.files[0])}
            />
          </div>

          {/* Name */}
          <label className="field-label">Name</label>
          <input
            type="text"
            placeholder="e.g. Spicy Paneer Wrap"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          {/* Price */}
          <label className="field-label">Price (₹)</label>
          <input
            type="number"
            placeholder="e.g. 199"
            value={price}
            min="0"
            onChange={(e) => setPrice(e.target.value)}
          />

          {/* Description */}
          <label className="field-label">Description</label>
          <textarea
            maxLength={180}
            placeholder="description and food Quantity for given price"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <div className="char-count">{desc.length}/180</div>

          <button
            className="primary-btn"
            disabled={!videoFile || !name || !desc || !price}
          >
            Save Food
          </button>
        </div>
      </div>
    </form>
    <nav className="bottom-nav">

  

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

  
</nav>
    </>
  );
};

export default CreateFood;