// routes/address.routes.js
const express = require("express");
const router = express.Router();
const Address = require("../models/address.model");
const authMiddleware = require("../middlewares/auth.middleware");

// Save / Update Address
router.post("/",authMiddleware.authUserMiddleware, async (req, res) => {
  const existing = await Address.findOne({ user: req.user.id });

  if (existing) {
    const updated = await Address.findByIdAndUpdate(existing._id, req.body, { new: true });
    return res.json(updated);
  }

  const address = new Address({ ...req.body, user: req.user.id });
  await address.save();
  res.json(address);
});

// Get Address
router.get("/", authMiddleware.authUserMiddleware, async (req, res) => {
  const address = await Address.findOne({ user: req.user.id });
  res.json(address);
});

module.exports = router;