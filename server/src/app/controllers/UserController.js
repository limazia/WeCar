const connection = require("../../database/connection");
const moment = require("../../helpers/moment");
const constant = require("../constants");

class UserController {
  async account(request, response, next) {
    const results = await connection("users").where({
      id: request.userId,
    });

    if (results.length >= 1) {
      const { id, name, email, updateAt, createdAt } = results[0];

      return response.json({
        id,
        name,
        email,
        updateAt,
        createdAt,
      });
    } else {
      response.json({ error: constant.error.NO_USER_FOUND_WITH_THIS_ID });
    }
  }

  async updateByScope(request, response, next) {
    return response.json({
      error: constant.error.TYPE_NOT_IDENTIFIED_IN_ALLOWED_SCOPE,
    });
  }

  async listAllUsers(request, response, next) {
    return response.json({
      error: constant.error.TYPE_NOT_IDENTIFIED_IN_ALLOWED_SCOPE,
    });
  }

  async createUser(request, response, next) {
    return response.json({
      error: constant.error.TYPE_NOT_IDENTIFIED_IN_ALLOWED_SCOPE,
    });
  }

  async findUserById(request, response, next) {
    return response.json({
      error: constant.error.TYPE_NOT_IDENTIFIED_IN_ALLOWED_SCOPE,
    });
  }

  async updateUserById(request, response, next) {
    return response.json({
      error: constant.error.TYPE_NOT_IDENTIFIED_IN_ALLOWED_SCOPE,
    });
  }

  async deleteUser(request, response, next) {
    return response.json({
      error: constant.error.TYPE_NOT_IDENTIFIED_IN_ALLOWED_SCOPE,
    });
  }
}

module.exports = new UserController();
