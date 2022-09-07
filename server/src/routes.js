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
  router.post("/logout", Authentication.token, AuthController.logout);
});

//Rota do Usuário Logado
routes.group("/api/me", (router) => {
  router.get("/account", Authentication.token, UserController.account);
  //router.put("/update/:scope/:id", Authentication.token, UserController.updateByScope);
});

//Rota do Usuário
routes.group("/api/user", (router) => {
  router.get("/", Authentication.token, UserController.listAllUsers);
  router.post("/", Authentication.token, UserController.createUser);
  router.get("/:id", Authentication.token, UserController.findUserById);
  router.put("/:id", Authentication.token, UserController.updateUserById);
  router.delete("/:id", Authentication.token, UserController.deleteUser);
});

//Rotas de Marcas
routes.group("/api/brand", (router) => {
  router.get("/", BrandController.listAllBrands);
  router.get("/:brand", BrandController.listBrandById);
  router.post("/", BrandController.createBrand);
  router.get("/:id", BrandController.findBrandById);
  router.put("/:id", BrandController.updateBrand);
  router.delete("/:id", BrandController.deleteBrand);
});

//Rotas de Modelos
routes.group("/api/model", (router) => {
  router.get("/", ModelController.listAllModels);
  router.post("/", ModelController.createModel);
  router.get("/:id", ModelController.findModelById);
  router.put("/:id", ModelController.updateModel);
  router.delete("/:id", ModelController.deleteModel);
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
routes.post("/api/contact", EmailController.sendContactEmail);
routes.post("/api/sellcar", EmailController.sendSellEmail);

module.exports = routes;