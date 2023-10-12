const cryptoRandomString = require("crypto-random-string");

const connection = require("../../database/connection");
const constant = require("../constants");
const moment = require("../../helpers/moment");

class ModelController {
  async listAllModels(request, response) {
    const models = await connection("models")
      .select([
        "models.*",
        "brands.brand_name as brand_name",
        "brands.brand_slug as brand_slug",
      ])
      .leftJoin("brands", "models.id_brand", "=", "brands.brand_id")
      .orderBy("models.createdAt", "desc");

    const serializedItems = models.map((item) => {
      const {
        model_id,
        model_name,
        model_slug,
        brand_name,
        brand_slug,
        createdAt,
      } = item;

      return {
        model_id,
        model_name,
        model_slug,
        brand_name,
        brand_slug,
        createdAt: moment(createdAt).format("DD [de] MMMM, YYYY"),
      };
    });

    if (models.length <= 0) {
      return response.json({ results: [] });
    }

    return response.json({ results: serializedItems });
  }

  async createModel(request, response) {
    const { model } = request.body;
    const { model_name, model_slug, id_brand } = model;

    const nameQuery = await connection("models").where({ model_name });
    const slugQUery = await connection("models").where({ model_slug });
    const model_id = cryptoRandomString({ length: 15 });

    if (!model_name) {
      return response.json({ error: constant.error.input.ENTER_AN_MODEL_NAME });
    } else {
      if (nameQuery.length > 0) {
        return response.json({
          error: constant.error.form.VALUE_ALREADY_REGISTERED,
        });
      }
    }

    if (!model_slug) {
      return response.json({ error: constant.error.input.ENTER_AN_MODEL_SLUG });
    } else {
      if (slugQUery.length > 0) {
        return response.json({
          error: constant.error.form.VALUE_ALREADY_REGISTERED,
        });
      }
    }

    await connection("models").insert({
      model_id,
      model_name,
      model_slug,
      id_brand,
    });

    return response.json({ message: constant.success.SUCCESSFULLY_REGISTERED });
  }

  async findModelById(request, response) {
    const { model_id } = request.params;
    const model = await connection("models")
      .where({ model_id })
      .orderBy("createdAt", "desc");

    if (model.length >= 1) {
      const { model_id, model_name, model_slug, id_brand, createdAt } =
        model[0];

      return response.json({
        results: {
          model_id,
          model_name,
          model_slug,
          id_brand,
          createdAt: moment(createdAt).format("DD [de] MMMM, YYYY"),
        },
      });
    } else {
      response.json({ error: constant.error.NO_ITEM_FOUND_WITH_THIS_ID });
    }
  }
 
  async updateModel(request, response) {
    const { model_id } = request.params;

    const model = await connection("models").where({ model_id });

    if (!model_id) {
      return response.json({
        error: constant.error.NO_ITEM_FOUND_WITH_THIS_ID,
      });
    }

    if (model[0].length === 0) {
      return response.json({
        error: constant.error.NO_ITEM_FOUND_WITH_THIS_ID,
      });
    }

    await connection("models").update(request.body).where({ model_id });

    return response.json({
      message: constant.success.RECORD_SUCCESSFULLY_UPDATED,
    });
  }

  async deleteModel(request, response) {
    return response.json({
      nome: "luis",
    });
  }
}

module.exports = new ModelController();
