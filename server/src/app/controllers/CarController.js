const connection = require("../../database/connection");
const moment = require("../../helpers/moment");

class CarController {
  async listAllCars(request, response) {
    const cars = await connection("cars")
      .select([
        "cars.*",
        "brands.brand_name as brand_name",
        "brands.brand_slug as brand_slug",
        "models.model_name as model_name",
        "models.model_slug as model_slug",
      ])
      .leftJoin("models", "cars.id_model", "=", "models.model_id")
      .leftJoin("brands", "models.id_brand", "=", "brands.brand_id")
      .orderBy("cars.createdAt", "desc");

    const serializedItems = cars.map((item) => {
      const {
        car_id,
        car_km,
        car_price,
        car_image,
        car_fuel,
        car_exchange,
        car_year,
        car_observation,
        brand_name,
        brand_slug,
        model_name,
        model_slug,
        createdAt,
      } = item;

      return {
        car_id,
        car_km: Number(car_km),
        car_price: Number(car_price),
        car_image: car_image
          ? car_image.split(",").map((image) => image.trim())
          : null,
        car_fuel,
        car_exchange,
        car_year,
        car_observation,
        brand_name,
        brand_slug,
        model_name,
        model_slug,
        createdAt: moment(createdAt).format("DD [de] MMMM, YYYY"),
      };
    });

    if (cars.length <= 0) {
      return response.json({ results: [] });
    }

    return response.json({ results: serializedItems });
  }

  async listAllCarsByBrand(request, response) {
    const { brand, model } = request.params;
    const cars = await connection("cars")
      .select([
        "cars.*",
        "brands.brand_name as brand_name",
        "brands.brand_slug as brand_slug",
        "models.model_name as model_name",
        "models.model_slug as model_slug",
      ])
      .leftJoin("models", "cars.id_model", "=", "models.model_id")
      .leftJoin("brands", "models.id_brand", "=", "brands.brand_id")
      .where("brands.brand_slug", brand)
      .where("models.model_slug", model)
      .orderBy("cars.createdAt", "desc");

    const serializedItems = cars.map((item) => {
      const {
        car_id,
        car_km,
        car_price,
        car_image,
        car_fuel,
        car_exchange,
        car_year,
        car_observation,
        brand_name,
        brand_slug,
        model_name,
        model_slug,
        updatedAt,
        createdAt,
      } = item;

      return {
        car_id,
        car_km: Number(car_km),
        car_price: Number(car_price),
        car_image: car_image
          ? car_image.split(",").map((image) => image.trim())
          : null,
        car_fuel,
        car_exchange,
        car_year,
        car_observation,
        brand_name,
        brand_slug,
        model_name,
        model_slug,
        updatedAt: moment(updatedAt).format("L"),
        createdAt: moment(createdAt).format("L"),
      };
    });

    if (cars.length <= 0) {
      return response.json({ results: [] });
    }

    return response.json({ results: serializedItems });
  }

  async createCar(request, response) {
    return response.json({
      nome: "luis",
    });
  }

  async findCarById(request, response) {
    const { car_id } = request.params;
    const car = await connection("cars")
      .select([
        "cars.*",
        "brands.brand_name as brand_name",
        "brands.brand_slug as brand_slug",
        "models.model_name as model_name",
        "models.model_slug as model_slug",
      ])
      .leftJoin("models", "cars.id_model", "=", "models.model_id")
      .leftJoin("brands", "models.id_brand", "=", "brands.brand_id")
      .where("cars.car_id", car_id)
      .orderBy("cars.createdAt", "desc");

    if (car.length >= 1) {
      const {
        car_id,
        car_km,
        car_price,
        car_image,
        car_fuel,
        car_exchange,
        car_year,
        car_observation,
        brand_name,
        brand_slug,
        model_name,
        model_slug,
        updatedAt,
        createdAt,
      } = car[0];

      return response.json({
        results: {
          car_id,
          car_km: Number(car_km),
          car_price: Number(car_price),
          car_image: car_image
            ? car_image.split(",").map((image) => image.trim())
            : null,
          car_fuel,
          car_exchange,
          car_year,
          car_observation,
          brand_name,
          brand_slug,
          model_name,
          model_slug,
          updatedAt: moment(updatedAt).format("L"),
          createdAt: moment(createdAt).format("L"),
        },
      });
    } else {
      response.json({ error: constant.error.NO_ITEM_FOUND_WITH_THIS_ID });
    }
  }

  async updateCar(request, response) {
    return response.json({
      nome: "luis",
    });
  }

  async deleteCar(request, response) {
    return response.json({
      nome: "luis",
    });
  }
}

module.exports = new CarController();
