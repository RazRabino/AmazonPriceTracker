// called by server index js using node cron, 
// alert users with updates about watch list prices according to current prices.

const nodemailer = require('nodemailer');
const User = require("../models/UserModel");
const Product = require("../models/ProductModel");

async function sendMail(user, userSKU, userPrice, product) {
    const transporter = nodemailer.createTransport({
    service: 'gmail',
        auth: {
            user: 'web0app.Price.Tracker',
            pass: 'vthhthafbpsctshc'
        }
    });

    const mailOptions = {
        from: 'web0app.Price.Tracker@gmail.com',
        to: user.e_mail,
        subject: 'Price Alert!',
        text: `Hi ${user.user_name},\nyour watch listed Product: ${product.title.trim()} has been changed,\nand now the price(${product.price}) is lower then your wanted price ${userPrice}\ncome back to our site to buy it.\nPriceTracker.`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports.alertUsers = async function collectionUpdate() {
    const cursor = User.find({}).cursor();
    
    cursor.eachAsync(async function (user) {
        const watchList = user.price_watch_list;
        if(watchList) {
            watchList.forEach(async function(element) {
                const userSKU = element.sku;
                const userPrice = element.price;
                const product = await Product.findOne({sku: userSKU});

                if(product.price != null) {
                    if(product.price < userPrice) {
                        sendMail(user, userSKU, userPrice, product);
                    }
                }
            });
        }
    });
} // this function will be called from server index by automation.