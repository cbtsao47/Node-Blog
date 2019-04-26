const express = require("express");
const route = express.Router();
const postDb = require("../../data/helpers/postDb");

route.get("/", async (req, res) => {
  try {
    const posts = await postDb.get();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({ err });
  }
});

route.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const post = await postDb.getById(id);

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ err });
  }
});
route.post("/", async (req, res) => {
  try {
    const post = req.body;
    const postRes = await postDb.insert(post);
    res.status(201).json(postRes);
  } catch (err) {
    res.status(500).json({ err });
  }
});

route.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const update = req.body;
    const updateRes = await postDb.update(id, update);
    res.status(200).json(updateRes);
  } catch (err) {
    res.status(500).json({ err });
  }
});
route.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteRes = postDb.remove(id);

    if (deleteRes) {
      res.status(202).json({ deleted: true });
    } else {
      res.status(202).json({ deleted: false });
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});

module.exports = route;

// 200  OK
// 201  created
// 202  accepted
// 400  bad request (client(FE) is not supplying the right data)
// 401  unauthorized
// 404  not found
// 500  internal server error
// 0  false
// 1 true
