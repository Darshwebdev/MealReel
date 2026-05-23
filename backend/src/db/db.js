const mongoose = require("mongoose");

function connectDB() {
// <<<<<<< HEAD
    mongoose.connect(process.env.MONGODB_URI1)
        .then(() => {
            // console.log("MongoDB connected");
        })
        .catch((err) => {
            // console.log("MongoDB connection error:", err);
        })
// =======
  mongoose
    .connect(process.env.MONGODB_URI1)
    .then(() => {
      // console.log("MongoDB connected");
    })
    .catch((err) => {
      // console.log("MongoDB connection error:", err);
    });
// >>>>>>> 6c2d4fc (Added razorpay dependency)
}

module.exports = connectDB;
