require("dotenv").config();
const express = require("express");
const app = express();
// require("../node_modules/dotenv").config();
const cookieParser = require("cookie-parser");
const routesHandler = require("./routes/router.js");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const apiErrorHandler = require("./error/api-error-handler");
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
const cors = require("cors");
//
app.use(cors());
//
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
//
app.use(cookieParser());
app.use(fileUpload());
app.use(express.json());
app.use("/", routesHandler);
app.use(apiErrorHandler);
//
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("====================================");
  console.log("welcome to back", `${PORT}.`);
  console.log("====================================");
});

