const mongoose = require("mongoose");
require("dotenv").config();
const URL = process.env.MONGO_URL;

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(URL);
        console.log(`DB connection successful! DB connection instance ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("DB connection failed!");
        process.exit(0);
    }
}

module.exports = connectDB;