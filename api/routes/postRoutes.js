const express = require("express");
const route = express.Router();
const postDb = require("../../data/helpers/postDb");

route.get("/", async (req, res) => {
  try {
    let posts = await postDb.get();
    res.status(200).json(posts);
  } catch (err) {
    next(err, res);
  }
});

route.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postDb.getById(id);
    res.status(200).json(post);
  } catch (err) {
    next(err, res);
  }
});

route.post("/", async (req, res) => {
  try {
    const post = req.body;
    const createdPost = await postDb.insert(post);
    res.status(201).json(createdPost);
  } catch (err) {
    next(err, res);
  }
});

route.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = req.body;
    await postDb.update(id, post);
    const updatedPost = await postDb.getById(id);
    res.status(202).json(updatedPost);
  } catch (err) {
    next(err, res);
  }
});

route.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteStatus = await postDb.remove(id);
    res.status(202).json({ deleteStatus });
  } catch (err) {
    next(err, res);
  }
});
module.exports = route;
