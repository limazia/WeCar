const connection = require("../../database/connection");
const moment = require("../../helpers/moment");

class BrandController {
  async listAllBrands(request, response) {
    const brands = await connection("brands").orderBy("createdAt", "desc");

    const serializedItems = brands.map((item) => {
      const {
        brand_id,
        brand_name,
        brand_slug,
        createdAt,
      } = item;

      return {
        brand_id,
        brand_name,
        brand_slug,
        createdAt: moment(createdAt).format("LLL"),
      };
    });

    if (brands.length <= 0) {
      return response.json({ results: [] });
    }

    return response.json({ results: serializedItems });
  }

  async listBrandById(request, response) {
    const { brand } = request.params;
    const brands = await connection("brands")
      .select([
        "cars.*",
        "brands.brand_name as brand_name",
        "brands.brand_slug as brand_slug",
        "models.model_name as model_name",
        "models.model_slug as model_slug",
      ])
      .leftJoin("models", "brands.brand_id", "=", "models.id_brand")
      .leftJoin("cars", "models.model_id", "=", "cars.id_model")
      .where("brands.brand_slug", brand)
      .orderBy("cars.createdAt", "desc");

    const serializedItems = brands.map((item) => {
      const {
        brand_id,
        brand_name,
        brand_slug,
        model_name,
        model_slug,
        car_id,
        car_km,
        car_price,
        car_image,
        car_fuel,
        car_exchange,
        car_year,
        car_observation,
        createdAt,
      } = item;

      return {
        brand_id,
        brand_name,
        brand_slug,
        model_name,
        model_slug,
        car_id,
        car_km: Number(car_km),
        car_price: Number(car_price),
        car_image,
        car_fuel,
        car_exchange,
        car_year,
        car_observation,
        createdAt: moment(createdAt).format("DD [de] MMMM, YYYY"),
      };
    });

    if (brands.length <= 0) {
      return response.json({ results: [] });
    }

    return response.json({ results: serializedItems });
  }

  async createBrand(request, response) {
    return response.json({
      nome: "luis",
    });
  }

  async findBrandById(request, response) {
    return response.json({
      nome: "luis",
    });
  }

  async updateBrand(request, response) {
    return response.json({
      nome: "luis",
    });
  }

  async deleteBrand(request, response) {
    return response.json({
      nome: "luis",
    });
  }
}

module.exports = new BrandController();
