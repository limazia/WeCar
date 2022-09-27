const cryptoRandomString = require("crypto-random-string");

const connection = require("../../database/connection");
const constant = require("../constants");
const moment = require("../../helpers/moment");

class BrandController {
  async listAllBrands(request, response) {
    const brands = await connection("brands").orderBy("createdAt", "desc");

    const serializedItems = brands.map((item) => {
      const { brand_id, brand_name, brand_slug, createdAt } = item;

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
      .innerJoin("models", "brands.brand_id", "=", "models.id_brand")
      .innerJoin("cars", "models.model_id", "=", "cars.id_model")
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
        car_image: car_image
          ? car_image.split(",").map((image) => image.trim())
          : null,
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
    const { brand } = request.body;
    const { brand_name, brand_slug } = brand;

    const nameQuery = await connection("brands").where({ brand_name });
    const slugQUery = await connection("brands").where({ brand_slug });
    const brand_id = cryptoRandomString({ length: 15 });

    if (!brand_name) {
      return response.json({ error: constant.error.input.ENTER_AN_BRAND_NAME });
    } else {
      if (nameQuery.length > 0) {
        return response.json({
          error: constant.error.form.VALUE_ALREADY_REGISTERED,
        });
      }
    }

    if (!brand_slug) {
      return response.json({ error: constant.error.input.ENTER_AN_BRAND_SLUG });
    } else {
      if (slugQUery.length > 0) {
        return response.json({
          error: constant.error.form.VALUE_ALREADY_REGISTERED,
        });
      }
    }

    await connection("brands").insert({
      brand_id,
      brand_name,
      brand_slug,
    });

    return response.json({ message: constant.success.SUCCESSFULLY_REGISTERED });
  }

  async findBrandById(request, response) {
    const { brand_id } = request.params;
    const brand = await connection("brands")
      .where({ brand_id })
      .orderBy("createdAt", "desc");

    if (brand.length >= 1) {
      const { brand_id, brand_name, brand_slug, createdAt } = brand[0];

      return response.json({
        results: {
          brand_id,
          brand_name,
          brand_slug,
          createdAt: moment(createdAt).format("DD [de] MMMM, YYYY"),
        },
      });
    } else {
      response.json({ error: constant.error.NO_ITEM_FOUND_WITH_THIS_ID });
    }
  }

  async updateBrand(request, response) {
    const { brand_id } = request.params;

    const brand = await connection("brands").where({ brand_id });

    if (!brand_id) {
      return response.json({ error: constant.error.NO_ITEM_FOUND_WITH_THIS_ID });
    }

    if (brand[0].length === 0) { 
      return response.json({ error: constant.error.NO_ITEM_FOUND_WITH_THIS_ID });
    }

    await connection("brands").update(request.body).where({ brand_id });

    return response.json({ message: constant.success.RECORD_SUCCESSFULLY_UPDATED });
  }

  async deleteBrand(request, response) {
    const { brand_id } = request.params;
    const brand = await connection("brands").where({ brand_id });

    if (brand.length >= 1) {
      await connection("brands").delete().where({ brand_id });

      return response.json({ message: constant.success.RECORD_DELETED });
    }

    return response.json({ error: constant.error.NO_ITEM_FOUND_WITH_THIS_ID });
  }
}

module.exports = new BrandController();
