const express = require("express");
const isAuth = require("../middlewares/isAuth");
const router = express.Router();
require("dotenv").config();
const userController = require("../controllers/userController");
const controller = require("../controllers/controller");

router
  .post("/adminRegister", userController.signUp)
  .post("/adminlogin", userController.login)
  .post("/logout", userController.logout);

///// route article
router
  .post("/articles", isAuth, controller.publishArticles)
  .get("/articles", isAuth, controller.getArticles)
  .delete("/article/:article_id", isAuth, controller.deleteArticles)
  .get("/dernierArticles", controller.getLastArticles)
  .get("/articleDetails/:article_id", controller.articleDetails)
  .post("/votrePetitMot", controller.postReview)
  .get("/votrePetitMot", controller.getReview)
  .delete("/votrePetitMot/:id", isAuth, controller.deleteReview)
  .get("/articles/:tags", controller.getArticlesTag);
  

module.exports = router;
