const express = require("express");
require("dotenv").config();
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
// require("../../node_modules/dotenv").config();

const adminController = require("../controllers/adminController");
const controller = require("../controllers/controller");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_TEST);
//

//STRIPE
router.post("/api/stripe/charge", cors(), async(req, res) => {
  //
  let { amount, id } = req.body; 
  //
  console.log( "amout & id :", amount, id )
  try{
    const payment = await stripe.paymentIntents.create({
      amount: amount,
      currency: "EUR",
      description: "Your Company Description",
      payment_method: id, 
      confirm: true,
    })
    res.json({
      message: "Paiement réussit",
      success: true,
    })


  }
  catch(error){
    console.error(error)
    res.json({
      message: "le paiement à échoué",
      success: false,
    })
  }
})
//Admin_routes
router
  /*CREATE*/
  .post("/api/adminRegister", adminController.signUp) 
  .post("/api/adminlogin", adminController.login) 
  .post("/api/article", isAuth, adminController.publishArticles) 
  /*READ*/
  .post("/api/votrePetitMot", isAuth, adminController.getReview) 
  .post("/api/articles", isAuth, adminController.getArticles)
  .post(
    "/api/adminArticleDetails/:article_id", isAuth,
    adminController.articleDetails
  )
  .post("/api/votrePetitMot/:id", isAuth, adminController.getOneReview)//a ref
  /*UPDATE*/
  .put("/api/article/:article_id", isAuth, adminController.updateArticles)
  /*DELETE*/
  .delete("/api/article/:article_id", isAuth, adminController.deleteArticles)
  // .delete("/api/votrePetitMot/:id", isAuth, adminController.deleteReview); //ok!
  .delete("/api/votrePetitMot/:id", isAuth, adminController.deleteReview); //L
/*V2
    A propos: CRUD,
    Contact: CRUD,
*/

//User_routes
router
  /*CREATE*/
  .post("/api/votrePetitMot", controller.postReview) //a ref
  /*READ*/
  .get("/api/derniersArticles", controller.getLastArticles) //ok back and front!
  .get("/api/derniersPetitMots", controller.get3Reviews) //ok back and front
  .get("/api/allArticles", controller.getArticles) //ok!
  .get("/api/visitorArticle/:article_id", controller.articleDetails); //ok
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
