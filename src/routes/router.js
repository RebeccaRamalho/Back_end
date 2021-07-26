const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
require("../../node_modules/dotenv").config();
const userController = require("../controllers/userController");
const controller = require("../controllers/controller");

//Admin_routes
router
  /*CREATE*/
  .post("/api/adminRegister", userController.signUp) //ok!
  .post("/api/adminlogin", userController.login) //ok!
  .post("api/logout", userController.logout) //pas ok
  .post("/api/article", isAuth, controller.publishArticles) //ok!
  /*READ*/
  .get("/api/votrePetitMot", isAuth, controller.getReview) //ok!
  .get("/api/articles", isAuth, controller.getArticles) //ok!
  /*UPDATE*/
  .put("/api/articles/:article_id", isAuth, controller.updateArticles) //ok!
  /*DELETE*/
  .delete("/api/article/:article_id", isAuth, controller.deleteArticles) //ok!
  .delete("/api/votrePetitMot/:id", isAuth, controller.deleteReview); //ok!

//User_routes
router
  /*CREATE*/
  .post("/api/votrePetitMot", controller.postReview) //ok!
  /*READ*/
  .get("/api/derniersArticles", controller.getLastArticles) //ok!
  .get("/api/articleDetails/:article_id", controller.articleDetails) //ok
  .get("/api/derniersPetitMots", controller.get3Reviews) //ok!
  .get("/api/articles/:tags", controller.getArticlesTag); //ok!

router.use("*", (request, response) => {
  response.status(404).json({ message: "This ressource does not exist." });
});

module.exports = router;
