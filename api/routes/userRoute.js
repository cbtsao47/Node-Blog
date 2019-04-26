const express = require("express");
const route = express.Router();
const userDb = require("../../data/helpers/userDb");
const { hasName, capitalizeUserName } = require("../common/sharedMiddleware");

route.get("/", (req, res) => {
  userDb
    .get()
    .then(resp => {
      res.status(200).json(resp);
    })
    .catch(err => {
      err;
    });
});
route.get("/:id", (req, res) => {
  const { id } = req.params;
  userDb
    .getById(id)
    .then(resp => {
      res.status(200).json(resp);
    })
    .catch(err => {
      err;
    });
});
route.post("/", hasName, capitalizeUserName, (req, res) => {
  const post = req.body;
  userDb
    .insert(post)
    .then(resp => {
      res.status(201).json(resp);
    })
    .catch(err => {
      err;
    });
});

route.put("/:id", hasName, capitalizeUserName, (req, res) => {
  const { id } = req.params;
  const update = req.body;
  userDb
    .update(id, update)
    .then(resp => {
      res.status(200).json(resp);
    })
    .catch(err => {
      err;
    });
});
route.delete("/:id", (req, res) => {
  const { id } = req.params;
  userDb
    .remove(id)
    .then(resp => {
      if (resp) {
        res.status(202).json({ deleted: true });
      } else {
        res.status(202).json({ deleted: false });
      }
    })
    .catch(err => {
      res.status(500).json({ err });
    });
});

route.get("/:id/posts", (req, res) => {
  const { id } = req.params;
  userDb
    .getUserPosts(id)
    .then(resp => res.status(200).json(resp))
    .catch(err => res.status(500).json({ err }));
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
