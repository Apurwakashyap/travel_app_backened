const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const hotelDataAddedToDBRouter = require("./routes/dataImportRouter");
const categoryDataAddedToDBRouter = require("./routes/categoryImportRouter");

const hotelRouter = require("./routes/hotelRouter");
const categoryRouter = require("./routes/categoryRouter");
const singleHotelRouter = require("./routes/singleHotelRouter");
const authRouter = require("./routes/authRouter");
const wishlistRouter = require("./routes/wishlistRouter");

const connectDB = require("./config/dbconfig");

const app = express();

app.use(cors());
app.use(express.json());
connectDB();

const PORT = 3500;

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use("/api/hoteldata", hotelDataAddedToDBRouter);
app.use("/api/categorydata", categoryDataAddedToDBRouter);
app.use("/api/hotels", hotelRouter);
app.use("/api/category", categoryRouter);
app.use("/api/hotels", singleHotelRouter);
app.use("/api/auth", authRouter);
app.use("/api/wishlist", wishlistRouter);

mongoose.connection.once("open", () => {
    console.log("Connected to DB");
    app.listen(process.env.PORT || PORT, () => {
        console.log("Server is Up and Running");
    });
});