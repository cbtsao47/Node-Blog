const express = require("express");
const route = express.Router();

// database
const userDb = require("../../data/helpers/userDb");

// middleware
const formatName = require("../../common/sharedMiddleware.js");

// routes
route.get("/", async (req, res) => {
  try {
    const userList = await userDb.get();
    res.json(userList);
  } catch (err) {
    res.status(500).json({ message: `The user list cannot be retrieved` });
  }
});

route.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userDb.get(id);
    if (!user) {
      res.status(404).json({ message: "The User was not found" });
    } else {
      res.json(user);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "There was an error trying to find the user." });
  }
});

route.get("/:id/posts", async (req, res) => {
  const { id } = req.params;
  const user = await userDb.get(id);
  const userPosts = await userDb.getUserPosts(id);
  try {
    if (!user) {
      res.status(404).json({ message: "The User was not found" });
    } else {
      res.json(userPosts);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "There was an error trying to find the user." });
  }
});

route.post("", formatName, async (req, res) => {
  const user = req.body;

  try {
    const result = await userDb.insert(user);
    res.status(201).json({ message: `User has been created!` });
  } catch (err) {
    res
      .status(500)
      .json({ message: "There was an error saving user to the database" });
  }
});

route.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userDb.get(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
    } else {
      await userDb.remove(user.id);
      res.json(user);
    }
  } catch (err) {
    res.status(500).json({
      message: "There was an error trying to delete the user from the database."
    });
  }
});

route.put("/:id", formatName, async (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  try {
    const user = await userDb.get(id);
    if (!user) {
      res.status(404).json({ message: "User was not found" });
    } else {
      await userDb.update(id, updatedUser);
      res.json({ message: `${updatedUser} has been updated` });
    }
  } catch (err) {
    res.status(500).json({
      message: "The user information cannot be modified."
    });
  }
});

module.exports = route;
