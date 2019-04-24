const express = require("express");
const route = express.Router();
const userDb = require("../../data/helpers/userDb");

route.get("/", async (req, res) => {
  try {
    let users = await userDb.get();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ err });
  }
});

route.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userDb.getById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ err });
  }
});

route.post("/", async (req, res) => {
  try {
    const user = req.body;
    const createdUser = await userDb.insert(user);
    res.status(201).json(createdUser);
  } catch (err) {
    res.status(500).json({ err });
  }
});

route.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.body;
    await userDb.update(id, user);
    const updatedUser = await userDb.getById(id);
    res.status(202).json(updatedUser);
  } catch (err) {
    res.status(500).json({ err });
  }
});

route.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteStatus = await userDb.remove(id);
    res.status(202).json({ deleteStatus });
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = route;
