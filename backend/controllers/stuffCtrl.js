const Thing = require("../models/thingModel");

exports.createThing = async (req, res, next) => {
    let { title, description, imageUrl, userId, price } = req.body;
    try {
        let thing = await Thing.create({ title, description, imageUrl, userId, price });
        res.status(201).json({ message: "Things saved successfully", thing });
    } catch (error) {
        res.status(400).json({ error });
    }
};

exports.getOneThing = async (req, res, next) => {
    try {
        let thing = await Thing.findById(req.params.thingId);
        res.status(200).json(thing);
    } catch (error) {
        res.status(404).json({ error });
    }
};

exports.modifyThing = async (req, res, next) => {
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
};

exports.deleteThing = async (req, res, next) => {
    try {
        await Thing.findByIdAndDelete(req.params.thingId);
        res.status(200).json({ message: "Deleted" });
    } catch (error) {
        res.status(404).json({ error });
    }
};

exports.getAllThings = async (req, res, next) => {
    try {
        let things = await Thing.find();
        res.status(200).json(things);
    } catch (error) {
        res.status(400).json({ error });
    }
};
