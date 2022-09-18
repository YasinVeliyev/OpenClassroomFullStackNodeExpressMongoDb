const express = require("express");
<<<<<<< HEAD
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
<<<<<<< HEAD
=======
const express=require('express')
>>>>>>> parent of bc3147e (	modified:   backend/app.js)
=======
>>>>>>> parent of d1cbe3d (Create a RESTful web API using Node, Express and MongoDB)
=======
>>>>>>> parent of 54cc25c (Revert "	modified:   backend/app.js")

const app = express();

<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
const stuff = [
    {
        _id: "123456",
        title: "My first Thing",
        description: "All of about my things",
        imageUrl: "",
        price: 4900,
        userId: "23111111111",
    },
    {
        _id: "12345ass6",
        title: "My second thing",
        description: "All of about my things",
        imageUrl: "",
        price: 3900,
        userId: "2311111s1111",
    },
];

>>>>>>> parent of d1cbe3d (Create a RESTful web API using Node, Express and MongoDB)
=======
>>>>>>> parent of 54cc25c (Revert "	modified:   backend/app.js")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    next();
});

app.get("/api/stuff", (req, res, next) => {
    res.status(200).json(stuff);
});

app.post("/api/stuff", (req, res, next) => {
    stuff.push(req.body);
    res.status(201).json({ message: "Things saved successfully", thing: req.body });
});

module.exports = app;
