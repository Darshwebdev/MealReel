import React, { useEffect, useState } from "react";
import "../../styles/reels.css";
import axios from "axios";
import ReelFeed from "../../components/ReelFeed";

const Saved = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    axios
      .get("https://mealreel.onrender.com/api/food/save", {
        withCredentials: true,
      })
      .then((response) => {
        const savedFoods = response.data.savedFoods.map((item) => ({
          _id: item.food._id,
          video: item.food.video,
          description: item.food.description,
          likeCount: item.food.likeCount,
          savesCount: item.food.savesCount,
          price: item.food.price,
          commentsCount: item.food.commentsCount,
          foodPartner: item.food.foodPartner,
        }));
        setVideos(savedFoods);
      });
  }, []);

  const removeSaved = async (item) => {
    try {
      await axios.post(
        "https://mealreel.onrender.com/api/food/save",
        { foodId: item._id },
        { withCredentials: true },
      );
      setVideos((prev) =>
        prev.map((v) =>
          v._id === item._id
            ? { ...v, savesCount: Math.max(0, (v.savesCount ?? 1) - 1) }
            : v,
        ),
      );
    } catch {
      // noop
    }
  };
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
  return (
    <ReelFeed
      items={videos}
      onSave={removeSaved}
      onShopNow={handleShopNow}
      emptyMessage="No saved videos yet."
    />
  );
};

export default Saved;
