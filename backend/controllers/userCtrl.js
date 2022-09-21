const User = require("../models/userModel");

exports.signUp = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.create({ email, password });
        console.log(user);
        res.status(201).json({ user, message: "User added sucessfully" });
    } catch (error) {
        res.status(500).json({ error });
    }
};

exports.signIn = async (req, res, next) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user && (await user.checkPassword(req.body.password))) {
            res.status(200).json({
                userId: user._id,
                token: "token",
            });
        } else {
            return res.status(401).json({ error: new Error("Email or Password is wrong") });
        }
    } catch (error) {
        res.status(500).json({ error });
    }
};
