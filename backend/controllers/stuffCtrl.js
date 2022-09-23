const Thing = require("../models/thingModel");
const fs = require("node:fs");
const path = require("node:path");
exports.createThing = async (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    req.body.thing = JSON.parse(req.body.thing);
    let { title, description, price } = req.body.thing;
    try {
        let thing = await Thing.create({
            title,
            description,
            imageUrl: url + "/images/" + req.file.filename,
            userId: req.auth.userId,
            price,
        });
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
    let { title, description, price } = req.body;
    try {
        let thing = await Thing.findOne({ _id: req.params.thingId });
        if (!thing) {
            res.status(404).json({ message: "Invalid request" });
        } else if (thing.userId.toString() === req.auth.userId) {
            if (req.file) {
                fs.unlinkSync(path.join("images", thing.imageUrl.split("/images/")[1]));
                const url = req.protocol + "://" + req.get("host");
                thing = await thing.updateOne(
                    { $set: { imageUrl: url + "/images/" + req.file.filename } },
                    { new: true }
                );
            }
            let updatedThing = await Thing.findByIdAndUpdate(
                req.params.userId,
                { title, description, price },
                { new: true }
            );
            res.status(200).json({ thing: updatedThing });
        } else {
            res.status(401).json({ message: "Unauthorised user" });
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ error });
    }
};

exports.deleteThing = async (req, res, next) => {
    console.log("ASddddddd");
    try {
        let thing = await Thing.findOne({ _id: req.params.thingId });

        if (!thing) {
            res.status(404).json({ message: "Invalid request" });
        } else if (thing.userId.toString() === req.auth.userId) {
            thing.delete();
            fs.unlinkSync(path.join("images", thing.imageUrl.split("/images/")[1]));
            res.status(200).json({ message: "Deleted" });
        } else {
            res.status(401).json({ message: "UnAuthorised user" });
        }
    } catch (error) {
        console.log(error);
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
