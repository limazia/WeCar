const bcrypt = require("bcrypt");

const connection = require("../database/connection");
const constant = require("../app/constants");

async function updateName(request, response, next) {
  try {
    const { id } = request.params;
    const { name } = request.body;

    const user = await connection("users").where({ id });
    let isName = "";

    if (name) {
      if (name === user[0].name) {
        isName = user[0].name;
      } else {
        isName = name;
      }
    } else {
      return response.json({ error: constant.error.input.ENTER_AN_NAME });
    }

    await connection("users").update({ name: isName }).where({ id });

    return response.json({ message: constant.success.NAME_SUCCESSFULLY_UPDATED });
  } catch (ex) {
    next(ex);
  }
}

async function updateEmail(request, response, next) {
  try {
    const { id } = request.params;
    const { email } = request.body;

    const user = await connection("users").where({ id });
    const checkEmail = email && (await connection("users").where({ email }));
    let isEmail = "";

    if (email) {
      if (email === user[0].email) {
        isEmail = user[0].email;
      } else {
        if (checkEmail.length >= 1) {
          return response.json({ error: constant.error.email.EMAIL_ALREADY_REGISTERED });
        } else {
          isEmail = email;
        }
      }
    } else {
      return response.json({ error: constant.error.input.ENTER_AN_EMAIL });
    }

    await connection("users").update({ email: isEmail }).where({ id });

    return response.json({ message: constant.success.EMAIL_SUCCESSFULLY_UPDATED });
  } catch (ex) {
    next(ex);
  }
}

async function updatePassword(request, response, next) {
  try {
    const { id } = request.params;
    const { password, newPassword, confirmPassword } = request.body;

    const user = await connection("users").where({ id });
    let isPassword = "";

    if (password && newPassword && confirmPassword) {
      if (await bcrypt.compare(password, user[0].password)) {
        if (newPassword === confirmPassword) {
          const salt = bcrypt.genSaltSync(10);
          const passwordCrypt = bcrypt.hashSync(newPassword, salt);
          isPassword = passwordCrypt;
        } else {
          return response.json({ error: constant.error.form.PASSWORDS_DONT_MATCH });
        }
      } else {
        return response.json({ error: constant.error.form.INVALID_PASSWORD });
      }
    }

    await connection("users").update({ password: isPassword }).where({ id });

    return response.json({ message: constant.success.PASSWORD_SUCCESSFULLY_UPDATED });
  } catch (ex) {
    next(ex);
  }
}
 
module.exports = {
  updateName,
  updateEmail,
  updatePassword,
};