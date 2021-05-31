const express = require("express");
const bodyParser = require("body-parser");
const routesHandler = require("./routes/handler.js");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use("/", routesHandler);

// Backend routing port
const PORT = 4000;
app.listen(PORT, () => {
  console.log("====================================");
  console.log("welcome to back", `${PORT}.`);
  console.log("====================================");
});
