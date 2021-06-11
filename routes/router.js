const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
require("dotenv").config();
//
const userController = require("../controllers/userController");
const controller = require("../controllers/controller");

/////route authentification
router
  .post("/api/adminRegister", userController.signUp) //A FAIRE OU A VOIR ..
  .post("/api/adminlogin", userController.login) // A SECURISER => FRONT REDIRECTION VERS LA PAGE ADMIN 
  .post("/api/logout", userController.logout); // OK

///// route articles
router
  .post("/api/articles", isAuth, controller.publishArticles) // FRONT A SECURISER DS LA PAGE ADMIN
  .get("/api/articles", isAuth, controller.getArticles) // FRONT A SECURISER DS LA PAGE ADMIN
  .delete("/api/article/:article_id", isAuth, controller.deleteArticles) // FRONT A SECURISER DS LA PAGE ADMIN
  .get("/api/dernierArticles", controller.getLastArticles)
  .get("/api/articleDetails/:article_id", controller.articleDetails)
  .get("/api/articles/:tags", controller.getArticlesTag)
  .put("/api/articles/:article_id", isAuth, controller.updateArticles);

////// route revievers
  router.post("/api/votrePetitMot", controller.postReview)
  .get("/api/votrePetitMot", controller.getReview)
  .delete("/api/votrePetitMot/:id", isAuth, controller.deleteReview); // FRONT A SECURISER DS LA PAGE ADMIN

router.use("*", (request, response) => {
  response.status(404).json({ message: "This ressource does not exist." });
});

module.exports = router;
