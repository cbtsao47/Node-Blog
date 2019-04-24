const express = require("express");
const config = require("../config/serverConfig");
const userRoute = require("./routes/userRoutes");
const postRoute = require("./routes/postRoutes");
const server = express();
config(server);
server.use("/api/posts", postRoute);
server.use("/api/users", userRoute);
module.exports = server;
