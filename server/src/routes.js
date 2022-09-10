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

<<<<<<< Updated upstream
module.exports = routes;
=======
//Rotas de Autenticação
routes.group("/api/auth", (router) => {
  router.post("/login", Authentication.token,AuthController.login);
  router.post("/logout", Authentication.token,Authentication.token, AuthController.logout);
});

//Rota do Usuário Logado
routes.group("/api/me", (router) => {
  router.get("/account", Authentication.token,Authentication.token, UserController.account);
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
>>>>>>> Stashed changes
