'use strict'
require("dotenv").config();
let PORT= process.env.PORT || 3000

const express= require("express")
const app = express()

const notFoundHandler = require("./handlers/404");
const errorHandler = require("./handlers/500");
const foodRouter = require("./routes/food.route");
const clothesRouter = require("./routes/clothes.route.js");
const logger = require('./middlewares/logger');

app.use(logger);
app.use(express.json());
app.use(foodRouter);
app.use(clothesRouter);
app.use("*",notFoundHandler);
app.use(errorHandler);

function start (PORT) {
app.listen(PORT, () => {
    console.log(`WE ARE IN PORT ${PORT}`);
}
    
    )
}

module.exports= {
    app:app,
    start:start
}