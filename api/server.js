const express = require("express");
const server = express();
const postRoute = require("./routes/postRoute");
const userRoute = require("./routes/userRoute");
const serverConfig = require("../config/serverConfig");
serverConfig(server);
server.use("/posts", postRoute);
server.use("/users", userRoute);
module.exports = server;
