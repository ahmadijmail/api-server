"use strict";
require("dotenv").config();



const POSTGRES_URI =
  process.env.NODE_ENV === "test" ? "sqlite:memory:" : process.env.DATABASE_URL;

const { Sequelize, DataTypes } = require("sequelize");
const food = require("./food.js");
const clothes = require("./clothes.js");

const Collection = require('./lib/collection')

let sequelizeOptions =
  process.env.NODE_ENV === "production"
    ? {
        dialect: "postgres",
        protocol: "postgres",
        dialectOptions: {
          ssl: { require: true, rejectUnauthorized: false}
        
        },
      }
    : {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);
const clothesTable = clothes(sequelize, DataTypes);
const foodTable = food(sequelize, DataTypes);

const clothesCollection = new Collection(clothesTable);
const foodCollection = new Collection(foodTable);




module.exports = {
  db: sequelize,
  //food: food(sequelize, DataTypes),
  //clothes: clothes(sequelize, DataTypes),
  clothesTable: clothesCollection,
  foodTable: foodCollection,
};
