// create server
const express = require('express');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/auth.routes');
const foodRoutes = require('./routes/food.routes');
const foodPartnerRoutes = require('./routes/food-partner.routes');
const paymentRoutes = require("./routes/payment.routes");
const addressRoutes = require("./routes/address.routes")
const cors = require('cors');

const app = express();
app.use(cors({
    origin: [
        "http://localhost:5173", // local dev
        "https://meal-reel-git-main-darshwebdevs-projects.vercel.app" // production frontend
    ],
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/food-partner', foodPartnerRoutes);
app.use("/api/payment",paymentRoutes);
app.use("/api/address",addressRoutes );


module.exports = app;
