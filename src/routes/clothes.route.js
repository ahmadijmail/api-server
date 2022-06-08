"use strict";
const express = require("express");

//in this line we are taking the routing functionality from express

const { clothesTable } = require("../models/index");

const clothesRouter = express.Router();
//add routes
clothesRouter.get("/", handelhome);
clothesRouter.get("/clothes", getclothes);
clothesRouter.get("/clothes/:id", getoneclothes);
clothesRouter.post("/addclothes", createclothes);
clothesRouter.put("/clothes/:id", updateclothes);
clothesRouter.delete("/clothes/:id", deleteclothes);

function handelhome(req, res) {
  res.status(200).send("Hello User");
}

async function getclothes(req, res) {
  let allclothes = await clothesTable.read();
  res.status(200).json(allclothes);
}

async function getoneclothes(req, res) {
  const clothesId = parseInt(req.params.id);
  let findclothes = await clothesTable.read(clothesId);
  res.status(200).json(findclothes);
}

async function createclothes(req, res) {
  let newclothes = req.body;
  let addclothes = await clothesTable.create(newclothes);
  res.status(201).json(addclothes);
}

async function updateclothes(req, res) {
  let clothesId = parseInt(req.params.id);
  let updateclothes = req.body;
  let foundclothes = await clothesTable.read(clothesId);
  if (foundclothes) {
    let updatedclothes = await foundclothes.update(updateclothes);
    res.status(201).json(updatedclothes);
  }
}
async function deleteclothes(req, res) {
  let clothesId = parseInt(req.params.id);
  let deleteclothes = await clothesTable.delete(clothesId);
  res.status(204).send("record deleted");
}

module.exports = clothesRouter;
