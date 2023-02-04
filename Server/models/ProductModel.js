const mongoose = require("mongoose");

const historyModel = {
    date: "",
    price: 0
};

const ProductModel = new mongoose.Schema({
    sku: {type: String, required: true, unique: true},
    title: {type: String, required: false},
    img: {type: String, required: false},
    price: {type: Number, required: false},
    ships_by: {type: String, required: false},
    sold_by: {type: String, required: false},
    manufacturer: {type: String, required: false},
    customer_reviews_stars: {type: String, required: false},
    customer_reviews_amount: {type: String, required: false},
    description: {type: String, required: false},
    price_history: {type: [historyModel], default: undefined, required: false}
}, {timestamps: true});

module.exports = mongoose.model("Product", ProductModel);