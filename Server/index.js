// include
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

// routs
const UserRoute = require("./routes/UserRoute");
const ProductRoute = require("./routes/ProductRoute");

// automation
const PriceUpdate = require("./automation/AmazonPriceUpdate");
const PriceAlert = require("./automation/AmazonPriceAlert");
const cron = require("node-cron");

dotenv.config();

mongoose.connect(process.env.MONGO_DB_URL).then(() => {
    console.log("Server: DB Connection is been made successfully.");
}).catch((err) => {
    console.log(`Server: ${err}`);
});

app.use(cors());
app.use(express.json());
app.use("/User", UserRoute);
app.use("/Product", ProductRoute);

cron.schedule("15 20 * * *", function() {
    console.log('---------------------');
    console.log('Server: Product price update cron job is runing.');
    PriceUpdate.updatePrice();
});

cron.schedule("59 20 * * *", function() {
    console.log('---------------------');
    console.log('Server: Product price alert cron job is runing.');
    PriceAlert.alertUsers();
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server: server started on port ${PORT}...`);
});