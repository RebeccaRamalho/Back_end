const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
require("../../node_modules/dotenv").config();
const adminController = require("../controllers/adminController");
const controller = require("../controllers/controller");

//Admin_routes
router
  /*CREATE*/
  .post("/api/adminRegister", adminController.signUp) //ok!
  .post("/api/adminlogin", adminController.login) //ok!
  .post("/api/article", adminController.publishArticles) //ok!
  .post("api/logout", adminController.logout) //pas ok
  /*READ*/
  .get("/api/votrePetitMot", adminController.getReview) //ok back!//pas ok front
  .get("/api/articles", adminController.getArticles) //ok back!//pas ok front
  .get(
    "/api/adminArticleDetails/:article_id",
    isAuth,
    adminController.articleDetails
  )
  /*UPDATE*/
  .put("/api/articles/:article_id", adminController.updateArticles) //ok!
  /*DELETE*/
  .delete("/api/article/:article_id", adminController.deleteArticles) //ok!
  .delete("/api/votrePetitMot/:id", adminController.deleteReview); //ok!
/*V2
    A propos: CRUD,
    Contact: CRUD,
*/

//User_routes
router
  /*CREATE*/
  .post("/api/votrePetitMot", controller.postReview) //ok back and front
  /*READ*/
  .get("/api/derniersArticles", controller.getLastArticles) //ok back and front!
  .get("/api/derniersPetitMots", controller.get3Reviews) //ok back and front
  .get("/api/allArticles", controller.getArticles) //ok!
  .get("/api/articleDetails/:article_id", controller.articleDetails); //ok
  /*V2
    A propos: R,
    Contact: R,
  */

  /*Bonus
  Tags:  .get("/api/articles/:tags", controller.getArticlesTag) //ok côté user pas admin
  */

router.use("*", (request, response) => {
  response.status(404).json({ message: "This ressource does not exist." });
});

module.exports = router;
