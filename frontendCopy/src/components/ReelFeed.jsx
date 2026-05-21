import React, { useEffect, useRef, useState } from 'react'
import { Link,useNavigate} from 'react-router-dom'
import "../styles/reelfeed.css"
import axios from 'axios'

// - emptyMessage: string

const ReelFeed = ({ items = [], onLike, onSave, emptyMessage = 'No videos yet.' }) => {
  const videoRefs = useRef(new Map())
const navigate = useNavigate();
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target
          if (!(video instanceof HTMLVideoElement)) return
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            video.play().catch(() => { /* ignore autoplay errors */ })
          } else {
            video.pause()
          }
        })
      },
      { threshold: [0, 0.25, 0.6, 0.9, 1] }
    )

    videoRefs.current.forEach((vid) => observer.observe(vid))
    return () => observer.disconnect()
  }, [items])

  const setVideoRef = (id) => (el) => {
    if (!el) { videoRefs.current.delete(id); return }
    videoRefs.current.set(id, el)
  }
 
const isAuthenticated = () => {
  const user = localStorage.getItem("user");
  const foodPartner = localStorage.getItem("foodPartner");
  return !!(user || foodPartner);
};
const showLoginError = () => {
  alert("Please login first to continue 🔒", {
    style: {
      background: "#111",
      color: "#fff",
      border: "1px solid #f2995a",
    },
  });
    navigate("/user/login"); 
};
const handleShopNow = (foodId) => {
  localStorage.setItem("foodId",foodId)
  if (isAuthenticated()) {
    navigate("/checkout/address");
  } else {
    showLoginError();
  }
};


//for category mate
const [foods, setFoods] = useState([]);
const [selectedCategory, setSelectedCategory] = useState(null);
const [loading, setLoading] = useState(false);

const fetchFoods = async (category = null) => {
  try {
    setLoading(true);

    let url = "http://localhost:3000/api/food";

    if (category) {
      url += `/${encodeURIComponent(category)}`;
    }

    const response = await axios.get(url, {
      withCredentials: true
    });

    setFoods(response.data);
    setSelectedCategory(category);

  } catch (err) {
    // console.log(err);
  } finally {
    setLoading(false);
  }
};

 const displayedItems =
  selectedCategory !== null ? foods : items;

const handleCategoryClick = async (category) => {
  setSelectedCategory(category);
  await fetchFoods(category);
};
const handleAllClick = () => {
  setSelectedCategory(null);
  setFoods([]); // important reset
};
const handlePartnerClick = (partnerId) => {
  navigate(`/food-partner/${partnerId}`);
};
  return (
    
    <div className="reels-page">
      
      <div className="reels-feed" role="list">
       {displayedItems.length === 0 && (
  <div className="empty-overlay">
    <div className="empty-card">
      <h3>No Food Found 🍽️</h3>
      <p>
        {selectedCategory
          ? `Nothing available in ${selectedCategory}`
          : emptyMessage}
      </p>

      <button
        className="empty-btn"
        onClick={handleAllClick}
      >
        View All
      </button>
    </div>
  </div>
)}



<div className="category-bar">
  <div className="category-scroll">
    <span
  className="category-item"
  onClick={() => {
    handleAllClick()
  }}
>
  All
</span>

    <span className="category-item"
    onClick={()=>{
     handleCategoryClick("North Indian")
    }}
    >
      North Indian
      </span>
    <span className="divider"></span>

    <span className="category-item"
    
    onClick={()=>{
     handleCategoryClick("Mexican")
    }}
    >Mexican
    </span>
    <span className="divider"></span>

    <span className="category-item"
    onClick={()=>{
      handleCategoryClick("South Indian")
    }}
    >South Indian
      </span>
    <span className="divider"></span>

    <span className="category-item"
    onClick={()=>{
    handleCategoryClick("Italian")
    }}
    >Italian</span>
    <span className="divider"></span>

    <span className="category-item"
    onClick={()=>{
      handleCategoryClick("Chinese")
    }}
    >Chinese</span>
    <span className="divider"></span>

    <span className="category-item"
    onClick={()=>{
   handleCategoryClick("Japanese")
    }}
    >Japanese</span>
  </div>
</div>
  {displayedItems.map((item) => (

         

          <section key={item._id} className="reel" role="listitem">
            <video
              ref={setVideoRef(item._id)}
              className="reel-video"
              src={item.video}
              muted
              playsInline
              loop
              preload="metadata"
            />

            <div className="reel-overlay">
              <div className="reel-overlay-gradient" aria-hidden="true" />
              <div className="reel-actions">
                <div className="reel-action-group">
                  <button
                    onClick={onLike ? () => onLike(item) : undefined}
                    className="reel-action"
                    aria-label="Like"
                  >
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
                    </svg>
                  </button>
                  <div className="reel-action__count">{item.likeCount ?? item.likesCount ?? item.likes ?? 0}</div>
                </div>

                <div className="reel-action-group">
                  <button
                    className="reel-action"
                    onClick={onSave ? () => onSave(item) : undefined}
                    aria-label="Bookmark"
                  >
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
                    </svg>
                  </button>
                  <div className="reel-action__count">{item.savesCount ?? item.bookmarks ?? item.saves ?? 0}</div>
                </div>

                {/* <div className="reel-action-group">
            <button
              className="reel-action"
              aria-label="View Food Partner"
              onClick={() => handlePartnerClick(item.foodPartner)}
              >
            <div className="reel-action-group">
  <button
    className="reel-action"
    aria-label="View Food Partner"
    onClick={() => handlePartnerClick(item.foodPartner)}
  >
    <svg
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* restaurant/shop icon */}
      {/* <path d="M3 10l1-6h16l1 6" />
      <path d="M4 10v10h16V10" />
      <path d="M9 20v-6h6v6" />
    </svg>
  </button>

 
</div>
        </button>

  <div className="reel-action__count">Partner</div>
</div> */} 
              </div>

              <div className="reel-content">
                <p className="reel-description" title={item.description}>{item.description}</p>
                
                  <button className="reel-btn" onClick={() => handleShopNow(item._id)} aria-label="Shop now">Shop Now ₹{item.price}</button>
                
              </div>
              <button
                 className="partner-avatar-btn"
                  aria-label="View Food Partner"
                  onClick={() => handlePartnerClick(item.foodPartner)}
                  >
                    <svg
                       width="40"
                        height="40"
                       viewBox="0 0 24 24"
                       fill="black"
                      >
                    <path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5z"/>
                    <path d="M12 14c-4.4 0-8 2.7-8 6v1h16v-1c0-3.3-3.6-6-8-6z"/>
                    </svg>
                    
            </button>
            
            </div>
            <span className="partner-avatar-span" >Visit profile</span>
          </section>
        ))}
      </div>
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
    </div>
  )
}

export default ReelFeed
