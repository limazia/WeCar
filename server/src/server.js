require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const routes = require("./routes");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);

app.listen(3333, () => {
  console.log(`Listening on port ${process.env.APP_URL}:${process.env.APP_PORT}`);
});