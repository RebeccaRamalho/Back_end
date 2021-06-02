const express = require("express");
const router = express.Router();
require('dotenv').config();

const controller = require("../controllers/controller");

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


 
router.post("/adminRegister", controller.signUp) 
      .post("/article", controller.addArticle) 
      .delete("/articles/:admin_id/:article_id",controller.delete_a_article)
      .patch("/changeArticle/:article_id",controller.alter_a_article);
      // .post("/adminlogin", controller.login, controller.authentification);
      
      // .get("/Article/availableArticle", controller.get_all_article);
      
module.exports = router;

