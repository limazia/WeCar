const knex = require("knex");
const configuration = require("../config/database");

const connection = knex(configuration[process.env.APP_ENV]);

module.exports = connection;