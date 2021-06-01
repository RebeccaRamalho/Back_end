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


 
router.post("/register", controller.login)
      .post("/login", controller.login) 
      .post("/Article", controller.addArticle) 
      .delete("/Articles/:admin_id/:article_id",controller.delete_a_article)
      .patch("/changeArticle/:article_id",controller.alter_a_article);
// .post('')
      // .get("/Article/availableArticle", controller.get_all_article);
      

module.exports = router;
