const mongoose = require("mongoose");

const thingsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    price: { type: Number, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Story" },
});

module.exports = mongoose.model("Thing", thingsSchema);
