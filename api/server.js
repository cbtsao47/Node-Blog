const express = require("express");
const config = require("../config/serverConfig");
const userRoute = require("./routes/userRoutes");
const postRoute = require("./routes/postRoutes");
const server = express();
const errHandler = require("../common/errHandler");
config(server);
server.use("/api/posts", postRoute, errHandler);
server.use("/api/users", userRoute, errHandler);
module.exports = server;
