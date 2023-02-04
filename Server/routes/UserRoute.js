const router = require("express").Router();
const User = require("../models/UserModel");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const {verifyTokenAndAuthorization} = require("./verifyToken");


// Register
router.post("/register", async (req, res) => {
    if(!req.body.user_name) {
        res.status(401).json("use user_name header!");
        return;
    }

    if(!req.body.e_mail) {
        res.status(401).json("use e_mail header!");
        return;
    }

    if(!req.body.password) {
        res.status(401).json("use password header!");
        return;
    }

    const newUser = new User({
        user_name: req.body.user_name,
        e_mail: req.body.e_mail,
        password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString(),
        price_watch_list: []
    });

    try {
        const savedUser = await newUser.save();

        const user = await User.findOne({ user_name: req.body.user_name });

        const accessToken = jwt.sign({
                id: user._id,
            },
            process.env.JWT_SEC,
            {expiresIn:"3d"}
        );

        const { password, ...others } = user._doc;
        res.status(201).json({...others, accessToken});
    } catch (err) {
        res.status(500).json(err);
    }
});

// Login
router.post("/login", async (req, res) => {
    if(!req.body.user_name) {
        res.status(401).json("use user_name header!");
        return;
    }

    if(!req.body.password) {
        res.status(401).json("use password header!");
        return;
    }

    try {
        const user = await User.findOne({ user_name: req.body.user_name });
        if(!user) {
            res.status(401).json("Wrong credentials!");
            return;
        }

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );

        const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        if(OriginalPassword !== req.body.password) {
            res.status(401).json("Wrong credentials!");
            return;
        }

        const accessToken = jwt.sign({
                id: user._id,
            },
            process.env.JWT_SEC,
            {expiresIn:"3d"}
        );

        const { password, ...others } = user._doc;
        res.status(200).json({...others, accessToken});
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Delete user
router.delete("/del/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get user data
router.get("/profile/:id", verifyTokenAndAuthorization, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Update add watch list item
router.put("/alert/add/:id", verifyTokenAndAuthorization, async (req, res) => {
    if(!req.body.sku) {
        res.status(401).json("use sku header!");
        return;
    }

    if(!req.body.price) {
        res.status(401).json("use price header!");
        return;
    }

    const price_watch = {
        sku: req.body.sku,
        price: req.body.price
    };

    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $push: {price_watch_list: price_watch}
            },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Update delete watch list item
router.put("/alert/del/:id", verifyTokenAndAuthorization, async (req, res) => {
    if(!req.body.sku) {
        res.status(401).json("use sku header!");
        return;
    }

    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;

        const price_watch = {
            sku: req.body.sku
        };

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {
                $pull: {price_watch_list: price_watch}
            },
            { new: true }
        );
        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;