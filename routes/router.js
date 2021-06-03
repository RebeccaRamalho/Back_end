const express = require("express");
const router = express.Router();
require("dotenv").config();

const controller = require("../controllers/userController");

router.get("/articles", (req, res) => {
  const str = [
    {
      tiltle: "test",
      msg: "Lorenipsum patatitata",
      author: "maryse Condé",
    },
  ];
  res.end(JSON.stringify(str));
});

router
  .post("/adminRegister", controller.signUp)
  .post("/adminlogin", controller.login, controller.authentification);

// .get("/Article/availableArticle", controller.get_all_article);

module.exports = router;
