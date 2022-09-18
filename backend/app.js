const express = require("express");
require("dotenv").config({ path: "../.env" });
const mongoose = require("mongoose");
const Thing = require("./models/thingsSchema");
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

app.get("/api/stuff", async (req, res, next) => {
    try {
        let things = await Thing.find();
        console.log(things);
        res.status(200).json(things);
    } catch (error) {
        res.status(400).json({ error });
    }
});

app.get("/api/stuff/:thingId", async (req, res, next) => {
    try {
        let thing = await Thing.findById(req.params.thingId);
        res.status(200).json(thing);
    } catch (error) {
        res.status(404).json({ error });
    }
});

app.put("/api/stuff/:thingId", async (req, res, next) => {
    let { title, description, imageUrl, userId, price } = req.body;
    try {
        let thing = await Thing.findByIdAndUpdate(
            req.params.thingId,
            { title, description, imageUrl, userId, price },
            { new: true }
        );
        res.status(200).json(thing);
    } catch (error) {
        res.status(404).json({ error });
    }
});

app.delete("/api/stuff/:thingId", async (req, res, next) => {
    try {
        await Thing.findByIdAndDelete(req.params.thingId);
        res.status(200).json({ message: "Deleted" });
    } catch (error) {
        res.status(404).json({ error });
    }
});

app.post("/api/stuff", async (req, res, next) => {
    let { title, description, imageUrl, userId, price } = req.body;
    try {
        let thing = await Thing.create({ title, description, imageUrl, userId, price });
        res.status(201).json({ message: "Things saved successfully", thing });
    } catch (error) {
        res.status(400).json({ error });
    }
});

module.exports = app;
