const express = require("express");
const app = express();
require("dotenv").config();
const cookieParser = require("cookie-parser");
const routesHandler = require("./routes/router.js");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
// const { flash }= require("express-flash-message");

// console.log(___dirname);
var cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
app.use(cookieParser());
app.use("/", routesHandler);
// Backend routing port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("====================================");
  console.log("welcome to back", `${PORT}.`);
  console.log("====================================");
});
