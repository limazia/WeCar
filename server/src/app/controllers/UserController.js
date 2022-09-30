const cryptoRandomString = require("crypto-random-string");
const bcrypt = require("bcrypt");

const connection = require("../../database/connection");
const moment = require("../../helpers/moment");
const {
  updateName,
  updateEmail,
  updatePassword,
} = require("../../helpers/userUpdate");
const constant = require("../constants");

class UserController {
  async account(request, response) {
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

  async updateByScope(request, response) {
    const { scope } = request.params;
    const allowedScopes = ["name", "email", "password"];

    if (allowedScopes.includes(scope)) {
      switch (scope) {
        case "name":
          updateName(request, response);
          break;
        case "email":
          updateEmail(request, response);
          break;
        case "password":
          updatePassword(request, response);
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

  async listAllUsers(request, response) {
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

  async createUser(request, response) {
    const { name, email, permissions, password, confirm_password } =
      request.body;

    const user = await connection("users").where({ email });
    const salt = bcrypt.genSaltSync(10);
    const passwordCrypt = bcrypt.hashSync(password, salt);
    const id = cryptoRandomString({ length: 15 });

    let formatedPermissions = [];
    permissions.map(({ value }) => formatedPermissions.push(value));

    if (!name) {
      return response.json({ error: constant.error.input.ENTER_AN_NAME });
    }

    if (!email) {
      return response.json({ error: constant.error.input.ENTER_AN_EMAIL });
    } else {
      if (user.length > 0) {
        return response.json({
          error: constant.error.form.EMAIL_ALREADY_REGISTERED,
        });
      }
    }

    if (!password) {
      return response.json({ error: constant.error.input.ENTER_AN_PASSWORD });
    }

    if (password != confirm_password) {
      return response.json({ error: constant.error.form.PASSWORDS_DONT_MATCH });
    }

    await connection("users").insert({
      id,
      name,
      email,
      permissions: formatedPermissions.toString(),
      password: passwordCrypt,
    });

    return response.json({ message: constant.success.SUCCESSFULLY_REGISTERED });
  }

  async findUserById(request, response) {
    const { id } = request.params;
    const user = await connection("users").where({ id });

    if (user.length >= 1) {
      const { id, name, email, permissions, updateAt, createdAt } = user[0];

      return response.json({
        results: {
          id,
          name,
          email,
          permissions: permissions
            ? permissions.split(",").map((permission) => permission.trim())
            : null,
          updateAt: moment(updateAt).format("LL"),
          createdAt: moment(createdAt).format("LL"),
        },
      });
    } else {
      response.json({ error: constant.error.NO_ITEM_FOUND_WITH_THIS_ID });
    }
  }

  async updateUserById(request, response) {
    const { id } = request.params;
    const { name, email, permissions } = request.body;

    let formatedPermissions = [];
    permissions.map(({ value }) => formatedPermissions.push(value));

    const user = await connection("users").where({ id });

    if (!id) {
      return response.json({
        error: constant.error.NO_ITEM_FOUND_WITH_THIS_ID,
      });
    }

    if (user[0].length === 0) {
      return response.json({
        error: constant.error.NO_ITEM_FOUND_WITH_THIS_ID,
      });
    }

    await connection("users").update({
      name,
      email,
      permissions: formatedPermissions.toString(), 
    }).where({ id });

    return response.json({
      message: constant.success.RECORD_SUCCESSFULLY_UPDATED,
    });
  }

  async deleteUser(request, response) {
    const { id } = request.params;
    const user = await connection("users").where({ id });

    if (user.length >= 1) {
      await connection("users").delete().where({ id });

      return response.json({ message: constant.success.RECORD_DELETED });
    }

    return response.json({ error: constant.error.NO_ITEM_FOUND_WITH_THIS_ID });
  }
}

module.exports = new UserController();
