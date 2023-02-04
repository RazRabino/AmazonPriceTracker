const router = require("express").Router();
const Product = require("../models/ProductModel");
const AmazonPriceCheck = require("../automation/AmazonPriceCheck");


// Insert new item to products collection.
router.post("/:sku", async (req, res) => {
    if(!req.params.sku) {
        res.status(500).json("Error: Provide SKU number.");
        return;
    }

    const data = await AmazonPriceCheck.fetchPrice(req.params.sku);
    const newProduct = new Product({
        sku: data[0],
        title: data[1],
        img: data[2],
        price: data[3],
        ships_by: data[4],
        sold_by: data[5],
        manufacturer: data[6],
        customer_reviews_stars: data[7],
        customer_reviews_amount: data[8],
        description: data[9],
        price_history: []
    });

    try {
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Get item from products collection.
router.get("/:sku", async (req, res) => {
    if(!req.params.sku) {
        res.status(500).json("Error: Provide SKU number.");
        return;
    }

    try {
        let product = await Product.findOne({sku: req.params.sku});

        if(!product) {
            const data = await AmazonPriceCheck.fetchPrice(req.params.sku);

            if(isNaN(data[3])) {
                data[3] = 0;
            }

            const newProduct = new Product({
                sku: data[0],
                title: data[1],
                img: data[2],
                price: data[3],
                ships_by: data[4],
                sold_by: data[5],
                customer_reviews_stars: data[6],
                customer_reviews_amount: data[7],
                description: data[8],
                price_history: []
            });
            newProduct.save(function(err){
                if(err){
                     console.log(err);
                     return;
            }});

            res.status(200).json(newProduct);
        } else {
            const {_id, ...others} = product._doc;
            res.status(200).json(others);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// Product update will be aotumated by Server/automation/AmazonPriceUpdate.

module.exports = router;