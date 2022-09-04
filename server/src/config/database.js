require("dotenv").config();
const path = require("path");

module.exports = {
  development: {
    client: process.env.DB_DRIVE,
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: path.resolve(__dirname, "../", "database", "migrations"),
    },
    seeds: {
      directory: path.resolve(__dirname, "../", "database", "seeds"),
    },
  },

  production: {
    client: process.env.DB_DRIVE,
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    },
    migrations: {
      directory: path.resolve(__dirname, "../", "database", "migrations"),
    },
  },
};
