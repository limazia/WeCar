require("dotenv").config();
const connection = require("../database/connection");

const env = (key, defaultValue) => {
  const value = process.env[key] || defaultValue;

  if (typeof value === "undefined") {
    if (process.env.NODE_ENV === "development") {
      console.log(`Environment variable ${key} not set.`);
    } else {
      throw new Error(`Environment variable ${key} not set.`);
    }
  }

  return value;
};

const testConnection = () => {
  connection
    .raw("SELECT 1")
    .then(() => {
      console.log("Database successfully connected");
    })
    .catch((err) => {
      console.log("Database connection error");
    });
};

module.exports = {
  env,
  testConnection,
};
