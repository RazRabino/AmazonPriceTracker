const mongoose = require("mongoose");

const price_watch = {
    sku: "",
    price: 0
};

const UserModel = new mongoose.Schema({
    user_name: {type: String, required: true, unique: true},
    e_mail: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    price_watch_list: {type: [price_watch], required: true}
}, {timestamps: true});

module.exports = mongoose.model("User", UserModel);