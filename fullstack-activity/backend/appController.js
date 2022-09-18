const Product = require("./models/productModel");

exports.getProducts = async (req, res) => {
    try {
        let products = await Product.find();
        res.status(200).json({ products });
    } catch (error) {
        res.status(400).json({ error });
    }
};

exports.getProductById = async (req, res) => {
    try {
        let product = await Product.findById(req.params.productId);
        res.status(200).json({ product });
    } catch (error) {
        res.status(400).json({ error });
    }
};

exports.createProduct = async (req, res) => {
    let { name, description, price, inStock } = req.body;
    try {
        let product = await Product.create({ name, description, price, inStock });
        res.status(201).json({ product });
    } catch (error) {
        res.status(400).json({ error });
    }
};

exports.updateProduct = async (req, res) => {
    let { name, description, price, inStock } = req.body;
    try {
        let product = await Product.findByIdAndUpdate(
            req.params.productId,
            { name, description, price, inStock },
            { _new: true }
        );
        res.status(201).json(product);
    } catch (error) {
        res.status(400).json({ error });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        let product = await Product.findByIdAndDelete(req.params.productId);
        res.status(201).json({ message: "Deleted!" });
    } catch (error) {
        res.status(400).json({ error });
    }
};
