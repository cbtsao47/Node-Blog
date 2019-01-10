const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const server = express();

// database
const userDb = require("../data/helpers/userDb");
const postDb = require("../data/helpers/postDb");
const tagDb = require("../data/helpers/tagDb");

// middleware - global
server.use(express.json());
server.use(morgan("short"));
server.use(helmet());
server.use(cors());

function upperCase(req, res, next) {
  const user = req.body;
  const { name } = user;
  if (name.length > 128) {
    res.status(400).json({
      message: "Name is too long. Please shorten it to under 128 characters"
    });
  } else if (name) {
    const arr = name.split(" ");
    const upperCased = arr.map(
      item => item[0].toUpperCase() + item.slice(1).toLowerCase()
    );
    const joined = upperCased.join(" ");
    req.body.name = joined;
  } else {
    res.status(400).json({ message: "Please include user name" });
  }
  next();
}

// routes - users

server.get("/api/users", async (req, res) => {
  try {
    const userList = await userDb.get();
    res.json(userList);
  } catch (err) {
    res.status(500).json({ message: `The user list cannot be retrieved` });
  }
});

server.get("/api/users/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userDb.get(id);
    console.log("bt3", user);
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

server.post("/api/users", upperCase, async (req, res) => {
  const user = req.body;

  try {
    const result = await userDb.insert(user);
    res.status(201).json({ message: `User ${user.name} has been created!` });
  } catch (err) {
    res
      .status(500)
      .json({ message: "There was an error saving user to the database" });
  }
});

server.delete("/api/users/:id", async (req, res) => {
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

server.put("/api/users/:id", upperCase, async (req, res) => {
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

// routes - posts
server.get("/api/posts", async (req, res) => {
  try {
    const posts = await postDb.get();
    res.json(posts);
  } catch (err) {
    res
      .status(500)
      .json({ message: "The posts cannot be retrieved from the database." });
  }
});
server.get("/api/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postDb.get(id);
    console.log("bt3", post);
    if (!post) {
      res.status(404).json({ message: "The post was not found" });
    } else {
      res.json(post);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "There was an error trying to find the post." });
  }
});

server.post("/api/addpost/:userId", async (req, res) => {
  const { userId } = req.params;
  const post = req.body;

  try {
    const user = await postDb.get(userId);
    if (!user) {
      res.status(404).json({ message: "User was not found." });
    } else {
      const newPost = await postDb.insert(post);
      res.json(newPost);
    }
  } catch (err) {
    res.status(500).json({ message: "Could not add a new post." });
  }
});

server.delete("/api/posts/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postDb.get(id);
    console.log("post", post);
    if (!post) {
      res.status(404).json({ message: "The post does not exist." });
    } else {
      await postDb.remove(id);
      res.json(post);
    }
  } catch (err) {
    res.status(500).json({ message: "Could not delete post." });
  }
});

server.put("/api/posts/:postId", async (req, res) => {
  const { postId } = req.params;
  const post = req.body;

  try {
    const updatedPost = await postDb.update(postId, post);
    if (!updatedPost) {
      res
        .status(404)
        .json({ message: "Cannot update a post that doesn't exist." });
    } else {
      res.json(updatedPost);
    }
  } catch (err) {
    res.status(500).json({ message: "Could not update post." });
  }
});

module.exports = server;
