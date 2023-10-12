const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const connection = require("../../database/connection");
const constant = require("../constants");
const { AuthConfig } = require("../../config");

class AuthController {
  async login(request, response, next) {
    try {
      const { email, password } = request.body;
      const user = await connection("users").where({ email });

      if (!email) {
        return response.json({ error: constant.error.input.ENTER_AN_EMAIL });
      }

      if (!password) {
        return response.json({ error: constant.error.input.ENTER_AN_PASSWORD });
      }

      if (user.length >= 1) {
        if (!(await bcrypt.compare(password, user[0].password))) {
          return response.json({
            error: constant.error.form.INVALID_EMAIL_PASSWORD,
          });
        }

        user[0].password = undefined;

        const { id } = user[0];
        const token = jwt.sign({ id }, AuthConfig.secret, {
          expiresIn: AuthConfig.expiresIn,
        });
        const refreshToken = null;

        return response.json({
          type: "bearer",
          token,
          refreshToken
        });
      } else {
        return response.json({
          error:
            constant.error.form.THE_EMAIL_YOU_ENTERED_IS_NOT_LINKED_TO_AN_ACCOUNT,
        });
      }
    } catch (ex) {
      next(ex);
    }
  }

  async logout(request, response, next) {
    try {
      return response.json({ message: "ok" });
    } catch (ex) {
      next(ex);
    }
  }
}

module.exports = new AuthController();
