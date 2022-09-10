require("dotenv").config();
const express = require("express");
const cors = require("cors");

const routes = require("./routes");
const { AppConfig } = require("./config");
const { testConnection } = require("./helpers/utils");
const { handleError } = require("./helpers/handler");

const app = express();

if (process.env.APP_ENV === "development") {
  app.use(cors());
} else if (process.env.APP_ENV === "production") {
  app.use(cors({
    origin: "www.wecar.com.br"
  }));
} else {
  throw new Error("{env} invalid");
}

app.use(express.json());
app.use(routes);
app.use((err, req, res, next) => {
  handleError(err, res);
});

app.listen(AppConfig.port, () => {
  try {
    console.log("Starting up!");

    testConnection();
  } catch (ex) {
    console.log("error" + ex);
  } finally {
    console.log(`Listening on port ${AppConfig.server}`);
  }
});