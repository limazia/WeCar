const connection = require("../../database/connection");
const moment = require("../../helpers/moment");
const {
  updateName,
  updateEmail,
  updatePassword,
} = require("../../helpers/userUpdate");
const constant = require("../constants");

class UserController {
  async account(request, response, next) {
    const results = await connection("users").where({
      id: request.userId,
    });

    if (results.length >= 1) {
      const { id, name, email, permissions, updateAt, createdAt } = results[0];

      return response.json({
        id,
        name,
        email,
        permissions: permissions
          ? permissions.split(",").map((permission) => permission.trim())
          : null,
        updateAt: moment(updateAt).format("LL"),
        createdAt: moment(createdAt).format("LL"),
      });
    } else {
      response.json({ error: constant.error.NO_USER_FOUND_WITH_THIS_ID });
    }
  }

  async updateByScope(request, response, next) {
    const { scope } = request.params;
    const allowedScopes = ["name", "email", "password"];

    if (allowedScopes.includes(scope)) {
      switch (scope) {
        case "name":
          updateName(request, response, next);
          break;
        case "email":
          updateEmail(request, response, next);
          break;
        case "password":
          updatePassword(request, response, next);
          break;
        default:
          response.json({
            error: constant.error.TYPE_NOT_IDENTIFIED_IN_ALLOWED_SCOPE,
          });
      }
    } else {
      response.json({
        error: constant.error.TYPE_NOT_IDENTIFIED_IN_ALLOWED_SCOPE,
      });
    }
  }

  async listAllUsers(request, response, next) {
    const users = await connection("users").orderBy("createdAt", "asc");

    const serializedItems = users.map((item) => {
      const { id, name, email, permissions, createdAt } = item;

      return {
        id,
        name,
        email,
        permissions,
        createdAt,
        createdAt: moment(createdAt).format("DD [de] MMMM, YYYY"),
      };
    });

    if (users.length <= 0) {
      return response.json({ results: [] });
    }

    return response.json({ results: serializedItems });
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
