const connection = require("../../database/connection");
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
    return response.json({
      nome: "luis",
    });
  }

  async findModelById(request, response) {
    return response.json({
      nome: "luis",
    });
  }

  async updateModel(request, response) {
    return response.json({
      nome: "luis",
    });
  }

  async deleteModel(request, response) {
    return response.json({
      nome: "luis",
    });
  }
}

module.exports = new ModelController();
