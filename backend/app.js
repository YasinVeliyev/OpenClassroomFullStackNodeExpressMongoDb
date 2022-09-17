const express = require("express");

const app = express();

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
