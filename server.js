const express = require("express");
const app = express();
const path = require("path");
const moment = require("moment");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/weatherDB", { useNewUrlParser: true });
const api = require("./server/routes/api");
const axios = require(`axios`);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "dist")));
app.use(express.static(path.join(__dirname, "node_modules")));
app.use("/", api);

const port = 3000;
app.listen(port, function() {
  console.log(`Running on port ${port}`);
});
