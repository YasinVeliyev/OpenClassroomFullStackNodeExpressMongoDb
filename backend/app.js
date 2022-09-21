const express = require("express");
require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const stuffRoutes = require("./routes/stuff");
const userRoutes = require("./routes/user");

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

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/stuff", stuffRoutes);
app.use("/api/auth", userRoutes);

module.exports = app;
