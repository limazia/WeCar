const jwt = require("jsonwebtoken");

const { AuthConfig } = require("../../config");
const constant = require("../../app/constants");

class Authentication {
  async token(request, response, next) {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return response.json({ error: constant.error.NO_TOKEN_PROVIDED });
    }

    const [, token] = authHeader.split(" ");

    try {
      const decoded = jwt.verify(token, AuthConfig.secret);
      request.userId = decoded.id;

      return next();
    } catch (err) {
      return response.json({ error: constant.error.INVALID_TOKEN });
    }
  }
}

module.exports = new Authentication();