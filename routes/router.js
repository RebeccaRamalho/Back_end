const express = require("express");
const isAuth = require("../middlewares/isAuth");
const router = express.Router();
require("dotenv").config();
const userController = require("../controllers/userController");
const controller = require("../controllers/controller");

router
  .post("/api/adminRegister", userController.signUp)
  .post("/api/adminlogin", userController.login)
  .post("/api/logout", userController.logout);

///// route article
router
  .post("/api/articles", isAuth, controller.publishArticles)
  .get("/api/articles", isAuth, controller.getArticles)
  .delete("/api/article/:article_id", isAuth, controller.deleteArticles)
  .get("/api/dernierArticles", controller.getLastArticles)
  .get("/api/articleDetails/:article_id", controller.articleDetails)
  .post("/api/votrePetitMot", controller.postReview)
  .get("/api/votrePetitMot", controller.getReview)
  .delete("/api/votrePetitMot/:id", isAuth, controller.deleteReview)
  .get("/api/articles/:tags", controller.getArticlesTag);

module.exports = router;
