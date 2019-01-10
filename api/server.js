const express = require("express");
const server = express();
const configureMiddleware = require("../config/middleware");
const postsRouter = require("../routes/posts/postsRouter");
const usersRouter = require("../routes/users/usersRouter");

// middleware - global
configureMiddleware(server);

// routes - users
server.use("/users", usersRouter);

// routes - posts
server.use("/posts", postsRouter);

module.exports = server;
