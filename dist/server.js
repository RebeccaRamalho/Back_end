"use strict";

require("dotenv").config();

var express = require("express");

var app = express(); // require("../node_modules/dotenv").config();

var cookieParser = require("cookie-parser");

var routesHandler = require("./routes/router.js");

var bodyParser = require("body-parser");

var fileUpload = require("express-fileupload");

var apiErrorHandler = require("./error/api-error-handler");

var stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);

var cors = require("cors"); //


app.use(cors()); //

app.use(bodyParser.json({
  limit: "50mb"
}));
app.use(bodyParser.urlencoded({
  limit: "50mb",
  extended: true,
  parameterLimit: 50000
})); //

app.use(cookieParser());
app.use(fileUpload());
app.use(express.json());
app.use("/", routesHandler);
app.use(apiErrorHandler); //

var PORT = process.env.PORT || 4000;
app.listen(PORT, function () {
  console.log("====================================");
  console.log("welcome to back", "".concat(PORT, "."));
  console.log("====================================");
});