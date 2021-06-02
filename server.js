
require('dotenv').config();
const express = require("express");

const bodyParser = require("body-parser");
const routesHandler = require("./routes/router.js");
const bcrypt =require("bcrypt");
// const { flash }= require("express-flash-message");


// console.log(___dirname);
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", routesHandler);
app.use(express.json());

// Backend routing port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("====================================");
  console.log("welcome to back", `${PORT}.`);
  console.log("====================================");
});
