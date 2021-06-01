const express = require("express");
const router = express.Router();
const { Server } = require("http");

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

router.post("/Article", controller.addArticle) 
      .delete("/Articles/:admin_id/:article_id",controller.delete_a_article)
      .patch("/changeArticle/:article_id",controller.alter_a_article);
      // .get("/Article/availableArticle", controller.get_all_article);
      

module.exports = router;
