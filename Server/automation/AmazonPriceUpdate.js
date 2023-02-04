// called by server index js using node cron, 
// updating db with new values according to SKUs.

const puppeteer = require("puppeteer");
const Product = require("../models/ProductModel");

async function fetchNewValues(sku) {
    const url = "https://www.amazon.com/dp/" + sku;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const price_whole = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay > span > span.a-price-whole")).map(x => x.textContent)[0];
    });

    const price_fraction = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay > span > span.a-price-fraction")).map(x => x.textContent)[0];
    });

    const customer_reviews_stars = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("#acrPopover:nth-child(1)")).map(x => x.title).splice(",")[0];
    });

    const customer_reviews_amount = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("#acrCustomerReviewText")).map(x => x.textContent)[0];
    });

    browser.close();

    return [price_whole + price_fraction, customer_reviews_stars.trim(), customer_reviews_amount.trim()];
}

async function docUpdate(product_sku, now_date) {
    const newValues = await fetchNewValues(product_sku);
    const historyModel = {
        date: now_date,
        price: newValues[0]
    };

    Product.findOneAndUpdate(
        {sku: product_sku}, {
            $push: {price_history: historyModel},
            $set: {price: newValues[0], customer_reviews_stars: newValues[1], customer_reviews_amount: newValues[2]},
            $currentDate: { lastModified: true }
        }, {
            new: true
        }, function(err, res) {
            if(err) console.log(err);
        }
    );
    
    console.log("updating sku: " + product_sku + ".");
}

module.exports.updatePrice = async function collectionUpdate() {
    const cursor = await Product.find({}).cursor();
    const now_date = new Date();
    
    cursor.eachAsync(async function (doc) {
        docUpdate(doc.sku, now_date);
    });
} // this function will be called from server index by automation.