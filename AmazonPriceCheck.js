const puppeteer = require("puppeteer");

module.exports.fetchPrice = async function fetchPrice(sku) {
    const url = "https://www.amazon.com/dp/" + sku;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const title = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("#productTitle")).map(x => x.textContent)[0];
    });

    const img = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("#landingImage")).map(x => x.src)[0];
    });

    let price_whole = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay > span > span.a-price-whole")).map(x => x.textContent)[0];
    });

    let price_fraction = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("#corePriceDisplay_desktop_feature_div > div.a-section.a-spacing-none.aok-align-center > span.a-price.aok-align-center.reinventPricePriceToPayMargin.priceToPay > span > span.a-price-fraction")).map(x => x.textContent)[0];
    });

    const ships_by = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("#tabular-buybox > div.tabular-buybox-container > div:nth-child(4) > div > span")).map(x => x.textContent)[0];
    });

    const sold_by = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("#tabular-buybox > div.tabular-buybox-container > div:nth-child(4) > div > span")).map(x => x.textContent)[0];
    });

    const customer_reviews_stars = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("#acrPopover:nth-child(1)")).map(x => x.title).splice(",")[0];
    });

    const customer_reviews_amount = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("#acrCustomerReviewText")).map(x => x.textContent)[0];
    });

    const description = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("#productDescription > p > span")).map(x => x.textContent)[0];
    });

    browser.close();
    
    return [url.substring(url.search("/dp/") + 4, url.length), title, img, price_whole + price_fraction, ships_by, sold_by, customer_reviews_stars, customer_reviews_amount, description];
}