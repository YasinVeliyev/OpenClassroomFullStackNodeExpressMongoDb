const express = require("express");
const { default: mongoose } = require("mongoose");
require("dotenv").config({ path: "../../.env" });
const appController = require("./appController");
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

app.get("/api/products", appController.getProducts);
app.get("/api/products/:productId", appController.getProductById);
app.delete("/api/products/:productId", appController.deleteProduct);
app.put("/api/products/:productId", appController.updateProduct);
app.post("/api/products", appController.createProduct);

module.exports = app;
