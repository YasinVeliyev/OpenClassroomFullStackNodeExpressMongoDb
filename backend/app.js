const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const stuffRoutes = require("./routes/stuff");
const userRoutes = require("./routes/user");
const auth = require("./middleware/auth");

mongoose
    .connect(process.env.DATABASE_MONGODB_URI)
    .then(() => {
        console.log("Successfully connected to MongoDB Atlas!");
    })
    .catch((error) => {
        console.log("Unable to connect to MongoDB Atlas!");
        console.error(error);
    });

const app = express();
app.options("*", cors());

app.use((req, res, next) => {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization");
    res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static("images"));

app.use("/api/stuff", auth, stuffRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
