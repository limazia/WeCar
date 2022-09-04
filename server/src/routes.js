require("express-group-routes");
const express = require("express");

const routes = express.Router();

// Controllers
const BrandController = require("./app/controllers/BrandController");
const ModelController = require("./app/controllers/ModelController");
const CarController = require("./app/controllers/CarController");

// Middlewares
const Authentication = require("./app/middlewares/Authentication")

routes.get("/", function (request, response) {
  response.json({
    name: process.env.APP_NAME,
    environment: process.env.APP_ENV,
    technologies: ["Node.js", "MySQL", "React"],
  });
});

// Rotas de Marcas
routes.group("/api/brand", (router) => {
  router.get("/", BrandController.listAllBrands);
  router.get("/:brand", BrandController.listBrandById);
  router.post("/", BrandController.createBrand);
  router.get("/:id", BrandController.findBrandById);
  router.put("/:id", BrandController.updateBrand);
  router.delete("/:id", BrandController.deleteBrand);
});

// Rotas de Modelos
routes.group("/api/model", (router) => {
  router.get("/", ModelController.listAllModels);
  router.post("/", ModelController.createModel);
  router.get("/:id", ModelController.findModelById);
  router.put("/:id", ModelController.updateModel);
  router.delete("/:id", ModelController.deleteModel);
});

// Rotas de Carros
routes.group("/api/car", (router) => {
  router.get("/:brand/:model", CarController.listAllCars);
  router.post("/", CarController.createCar);
  router.get("/:id", CarController.findCarById);
  router.put("/:id", CarController.updateCar);
  router.delete("/:id", CarController.deleteCar);
});

module.exports = routes;