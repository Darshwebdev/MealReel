const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect(process.env.MONGODB_URI1)
        .then(() => {
            // console.log("MongoDB connected");
        })
        .catch((err) => {
            // console.log("MongoDB connection error:", err);
        })
}

module.exports = connectDB;
