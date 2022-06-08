"use strict";
const express = require("express");

//in this line we are taking the routing functionality from express

const { foodTable } = require("../models/index");

const foodRouter = express.Router();
//add routes
foodRouter.get("/", handelhome);
foodRouter.get("/food", getfood);
foodRouter.get("/food/:id", getonefood);
foodRouter.post("/addfood", createfood);
foodRouter.put("/food/:id", updatefood);
foodRouter.delete("/food/:id", deletefood);

function handelhome(req, res) {
  res.status(200).send("Hello User");
}

async function getfood(req, res) {
  let allfood = await foodTable.read();
  res.status(200).json(allfood);
}

async function getonefood(req, res) {
  const foodId = parseInt(req.params.id);
  let findfood = await foodTable.read(foodId);
  res.status(200).json(findfood);
}

async function createfood(req, res) {
  let newfood = req.body;
  let addfood = await foodTable.create(newfood);
  res.status(201).json(addfood);
}

async function updatefood(req, res) {
  let foodId = parseInt(req.params.id);
  let updatefood = req.body;
  let foundfood = await foodTable.read(foodId);
  if (foundfood) {
    let updatedfood = await foundfood.update(updatefood);
    res.status(201).json(updatedfood);
  }
}
async function deletefood(req, res) {
  let foodId = parseInt(req.params.id);
  let deletefood = await foodTable.delete(foodId);
  res.status(204).send('record deleted');


}

module.exports = foodRouter;
