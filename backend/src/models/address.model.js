// models/address.model.js
const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  fullName: String,
  phone: String,
  house: String,
  area: String,
  city: String,
  state: String,
  pincode: String,
  instructions: String,
  isDefault: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model("Address", addressSchema);