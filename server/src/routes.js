require("express-group-routes");
const express = require("express");

const routes = express.Router();

//Controllers
const AuthController = require("./app/controllers/AuthController");
const UserController = require("./app/controllers/UserController");
const BrandController = require("./app/controllers/BrandController");
const ModelController = require("./app/controllers/ModelController");
const CarController = require("./app/controllers/CarController");
const EmailController = require("./app/controllers/EmailController");

//Middlewares
const Authentication = require("./app/middlewares/Authentication")

routes.get("/", function (request, response) {
  response.json({
    name: process.env.APP_NAME,
    environment: process.env.APP_ENV,
    technologies: ["Node.js", "MySQL", "React"],
  });
});

//Rotas de Autenticação
routes.group("/api/auth", (router) => {
  router.post("/login", AuthController.login);
});

//Rota do Usuário Logado
routes.group("/api/me/", (router) => {
  router.use(Authentication.token);
  
  router.get("/account", UserController.account);
  router.put("/:scope/:id", UserController.updateByScope);
});

//Rota do Usuário
routes.group("/api/user", (router) => {
  router.use(Authentication.token);

  router.get("/", UserController.listAllUsers);
  router.post("/", UserController.createUser);
  router.get("/:id", UserController.findUserById);
  router.put("/:id", UserController.updateUserById);
  router.delete("/:id", UserController.deleteUser);
});

//Rotas de Marcas
routes.group("/api/brand", (router) => {
  router.get("/", BrandController.listAllBrands);
  router.get("/brands/:brand", BrandController.listBrandById);
  router.post("/", BrandController.createBrand);
  router.get("/:brand_id", BrandController.findBrandById);
  router.put("/:brand_id", BrandController.updateBrand);
  router.delete("/:brand_id", BrandController.deleteBrand);
});

//Rotas de Modelos
routes.group("/api/model", (router) => {
  router.get("/", ModelController.listAllModels);
  router.post("/", ModelController.createModel);
  router.get("/:model_id", ModelController.findModelById);
  router.put("/:model_id", ModelController.updateModel);
  router.delete("/:model_id", ModelController.deleteModel);
});

//Rotas de Carros
routes.group("/api/car", (router) => {
  router.get("/", CarController.listAllCars);
  router.get("/:brand/:model", CarController.listAllCarsByBrand);
  router.post("/", CarController.createCar);
  router.get("/:id", CarController.findCarById);
  router.put("/:id", CarController.updateCar);
  router.delete("/:id", CarController.deleteCar);
});

// Rotas com Email
routes.post("/api/contact", EmailController.ContactEmail);
routes.post("/api/sellcar", EmailController.SellEmail);

module.exports = routes;