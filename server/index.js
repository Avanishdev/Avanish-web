require("dotenv").config();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const connectDB = require("./utils/db.js");
const userRoute = require("./routes/auth.route.js");
const propertyRoute = require("./routes/property.route.js");
const cors = require("cors");
const errorHandler = require("./middlewares/error.middleware.js");

const corsOptions = {
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE,PATCH,HEAD",
    credentials: true,
};
app.use(cors(corsOptions));


app.use(bodyParser.json());

app.use("/api/v1/user", userRoute);
app.use("/api/v1/properties", propertyRoute);

app.use(errorHandler);

connectDB();

app.listen(PORT, () => {
    console.log(`App is running at PORT ${PORT}`);
})