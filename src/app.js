const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const marioModel = require("./models/marioChar");
const fs = require("fs");
const { json } = require("express");
// Middlewares
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
var x = 1;
// your code goes here
app.get("/mario", async (req, res) => {
  const total = await marioModel.find();
  const all = total.map((data) => {
    return {
      name: data.name,
      weight: data.weight,
    };
  });
  res.send(all);
});
app.get("/mario/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const existingMario = await marioModel.findOne({ _id: id });
    res.send({
      name: existingMario.name,
      weight: existingMario.weight,
    });
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

app.post("/mario", async (req, res) => {
  if (req.body.name && req.body.weight) {
    const data = { name: req.body.name, weight: req.body.weight };
    const newMario = new marioModel(data);
    await newMario.save();
    res.status(201).send(data);
  } else {
    res.status(400).send({
      message: "either name or weight is missing",
    });
  }
});

app.delete("/mario/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await marioModel.deleteOne({ _id: id });
    res.send({
      message: "character deleted",
    });
  } catch (e) {
    res.status(400).send({
      message: e.message,
    });
  }
});

app.patch("/mario/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const existing = await marioModel.findOne({ _id: id });
    if (req.body.name) {
      existing.name = req.body.name;
      await marioModel.updateOne(
        {
          _id: id,
        },
        {
          name: req.body.name,
        }
      );
    }
    if (req.body.weight) {
      existing.weight = req.body.weight;
      await marioModel.updateOne(
        {
          _id: id,
        },
        {
          weight: req.body.weight,
        }
      );
    }
    res.send({ name: existing.name, weight: existing.weight });
  } catch (e) {
    res.status(400).send({ message: e.message });
  }
});

module.exports = app;
