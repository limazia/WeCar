require("express-group-routes");
const express = require("express");

const routes = express.Router();

// Controllers
const TestController = require("./app/controllers/TestController");

// Middlewares
//const Authentication = require("./app/middlewares/Authentication")

routes.get("/", function (request, response) {
  response.json({
    name: process.env.APP_NAME,
    environment: process.env.APP_ENV,
    technologies: ["Node.js", "MySQL", "React"],
  });
});

// Rotas de ???
routes.group("/api/nome", (router) => {
  router.get("/luis", TestController.name);
});

module.exports = routes;