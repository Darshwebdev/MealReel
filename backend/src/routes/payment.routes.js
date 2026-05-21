const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware")
require("dotenv").config();
const Razorpay = require("razorpay");
const crypto = require("crypto");

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.VITE_RAZORPAY_KEY,
});

// ✅ CREATE ORDER - Matches frontend expectations exactly
router.post("/create-order", async (req, res) => {
  try {
    const { foodId } = req.body;

    if (!foodId) {
      return res.status(400).json({ message: "foodId required" });
    }

    // 1️⃣ Fetch price from DB (replace with your meal lookup)
    const mealPrice = 299; // TODO: Replace with `await Meal.findById(foodId).price`

    const order = await razorpay.orders.create({
      amount: mealPrice * 100, // paise
      currency: "INR",
      receipt: `meal_${foodId}_${Date.now().toString().slice(-8)}`,
    });

    // ✅ Frontend expects: { id, amount, currency }
    res.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
    });
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ message: "Order creation failed" });
  }
});

// ✅ VERIFY PAYMENT - Matches frontend payload exactly
router.post("/verify", (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res
        .status(400)
        .json({ success: false, message: "Missing payment details" });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.VITE_RAZORPAY_KEY)
      .update(body)
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      // TODO: Save payment to DB here
      return res.json({ success: true });
    }

    res.status(400).json({ success: false, message: "Invalid signature" });
  } catch (err) {
    console.error("Verification error:", err);
    res.status(500).json({ success: false });
  }
});

router.get(
  "/:id",
  authMiddleware.authUserMiddleware,
  async (req, res) => {
    try {
      const food = await require("../models/food.model").findById(req.params.id);

      if (!food) {
        return res.status(404).json({ message: "Food not found" });
      }

      res.status(200).json({
        _id: food._id,
        name: food.name,
        price: food.price,
        video: food.video,
        description: food.description,
      });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }
);

module.exports = router;
