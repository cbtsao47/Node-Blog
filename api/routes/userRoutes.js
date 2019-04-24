const express = require("express");
const route = express.Router();
const userDb = require("../../data/helpers/userDb");
const upperCaseName = require("../../common/upperCase");
const errHandler = require("../../common/errHandler");

route.get("/", async (req, res, next) => {
  try {
    let users = await userDb.get();
    res.status(200).json(users);
  } catch (err) {
    next(err, res);
  }
});

route.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userDb.getById(id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ err: "User Not Found" });
    }
  } catch (err) {
    next(err, res);
  }
});
route.get("/:id/posts", async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await userDb.getUserPosts(id);
    res.status(200).json(posts);
  } catch (err) {
    next(err, res);
  }
});
route.post("/", upperCaseName, async (req, res) => {
  try {
    const user = req.body;
    const createdUser = await userDb.insert(user);
    res.status(201).json(createdUser);
  } catch (err) {
    next(err, res);
  }
});

route.put("/:id", upperCaseName, async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.body;
    await userDb.update(id, user);
    const updatedUser = await userDb.getById(id);
    res.status(202).json(updatedUser);
  } catch (err) {
    next(err, res);
  }
});

route.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteStatus = await userDb.remove(id);
    res.status(202).json({ deleteStatus });
  } catch (err) {
    next(err, res);
  }
});

module.exports = route;
