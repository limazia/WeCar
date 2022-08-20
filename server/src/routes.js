require("express-group-routes");
const express = require("express");

const routes = express.Router();

routes.get("/", function (request, response) {
  response.json({
    name: process.env.APP_NAME,
    environment: process.env.APP_ENV,
    technologies: ["Node.js", "MySQL", "React"],
  });
});

module.exports = routes;
