const express = require("express");
const config = require("../config/serverConfig");
const server = express();

config(server);

module.exports = server;
