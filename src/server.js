const express = require("express");
const app = express();
require("../node_modules/dotenv").config();
const cookieParser = require("cookie-parser");
const routesHandler = require("./routes/router.js");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
// const { flash } = require("express-flash-message");

const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(fileUpload());
app.use(express.json());
app.use("/", routesHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log("====================================");
  console.log("welcome to back", `${PORT}.`);
  console.log("====================================");
});
