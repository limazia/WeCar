require("express-group-routes");
const express = require("express");

const routes = express.Router();

routes.get("/", function (request, response) {
  response.json({
    name: "WeCar",
    environment: "development",
  });
});

module.exports = routes;