require("dotenv").config();
const model = require("../model/adminModel");
const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const ApiError = require("../error/ApiError");

// const SECRET = "see_you_in_1M_years";///test
const MAXAGE = Math.floor(Date.now() / 1000) + 60 * 60 * 60 * 60; //
/*A_ATUHENTIFICATION */

/*I_Inscription*/

exports.signUp = async (request, response, next) => {
  const { email, user_name, password } = request.body;

  try {
    await model.getAdmin(
      email /*what i send to the model*/,
      (error, result) /*what i get from the model*/ => {
        /*1-Error managment */
        /*a_Server error managment*/
        if (error) {
          response.send(error.message);
        } else if (result.length !== 0) {
          /*b_User error managment (i check if username already exist in db)*/
          next(
            ApiError.Conflict(
              "un utilisateur avec cette email existe déjà dans la base de donnée"
            )
          );
        } else if (
          typeof email !== "string" ||
          typeof user_name !== "string" ||
          typeof password !== "string"
        ) {
          next(
            ApiError.badRequest(
              "Les champs doivent être une chaîne de caractères"
            )
          );
        } else if (email === "" || user_name === "" || password === "") {
          next(ApiError.badRequest("Tous les champs doivent être remplis"));
        } else {
          /*2-Password hashing*/

          const saltRounds = 10;

          bcrypt.hash(password, saltRounds, (error, hash) => {
            /*a_error managment */
            if (error) {
              response.send(error.message);
            }
            /*b_we stock user's data (including the hashing psswd) into a variable so we can
                           send it to the model so that the model can create the user in the db */
            const Admin = {
              email,
              user_name,
              password: hash,
            };

            /*c_we send user's data to the model*/
            model.createAccount(Admin, (error, result) => {
              if (error) {
                response.status(500).json({
                  message: "Server-side problem.",
                });
              } else {
                const adminDetails = {
                  user_name,
                  password,
                  email,
                };

                response.status(201).json(adminDetails);
              }
            });
          });
        }
      }
    );
  } catch (error) {
    console.error(error);
  }
};

/*II_Login */

exports.login = async (request, response, next) => {
  const { email, user_name, password } = request.body;

  try {
    await model.getAdmin(email, (error, result) => {
      if (error) {
        next(ApiError.internal("something went wrong"));
      } else if (result.length == 0) {
        next(
          ApiError.Unauthorized("l'email n'existe pas dans la base de donnée")
        );
      } else if (email === "" || user_name === "" || password === "") {
        next(ApiError.badRequest("Tous les champs doivent être remplis"));
      } else if (
        typeof email !== "string" ||
        typeof user_name !== "string" ||
        typeof password !== "string"
      ) {
        next(
          ApiError.badRequest(
            "Les champs doivent être une chaîne de caractères"
          )
        );
      } else {
        const hash = result[0].password;

        bcrypt.compare(password, hash, (error, correct) => {
          if (error) {
            response.status(500).json({
              message: "Error.",
            });
          }
          if (!correct) {
            response.status(401).json({
              message: "Wrong password.",
            });
          }
          const Admin = {
            admin_id: result[0].admin_id,
            user_name: result[0].user_name,
            password: result[0].password,
            email: result[0].email,
            exp: MAXAGE, ///////ici qu'on donne un âge au token?
          };

          jwt.sign(Admin, process.env.JWT_SECRET, (error, token) => {
            //test
            if (error) {
              response.status(500).json({
                message: "Server Error",
              });
            }

            // request.Admin = Admin;  v1
            request.Admin = {
              admin_id: result[0].admin_id,
              user_name: result[0].user_name,
              email: result[0].email,
            };
            // request.Admin = { admin_id }
            //
            // response.cookie("authcookie", token, { maxAge: MAXAGE });
            //
            response.status(200).json({
              token: token, //envoie dans les headers
              Admin: {
                admin_id: result[0].admin_id,
                user_name: result[0].user_name,
                password: result[0].password,
                email: result[0].email,
              },
            });
          });
        });
      }
    });
  } catch (error) {
    console.error(error);
  }
};

/*B_CRUD REQUEST NOT RELATED TO AUTHENTIFICATION**/

/*CREATE*/

/*admin i want to create an article*/
exports.publishArticles = (req, res, next) => {
  const { admin_id } = req.Admin;
  const {
    title,
    img,
    tags,
    resume_article,
    content_article,
    author_article,
    video,
  } = req.body;

  const article = {
    title,
    img,
    tags,
    resume_article,
    content_article,
    author_article,
    video,
  };

  console.log("ARticle", req.files);

  model.createArticle(article, admin_id, (error, result) => {
    if (error) {
      next(ApiError.internal("something went wrong"));
    } else if (
      title === "" ||
      img === "" ||
      tags === "" ||
      resume_article === "" ||
      content_article === "" ||
      author_article === ""
    ) {
      next(ApiError.badRequest("Les champs doivent être remplis"));
    } else if (
      typeof title !== "string" ||
      typeof img !== "string" ||
      typeof tags !== "string" ||
      typeof resume_article !== "string" ||
      typeof content_article !== "string" ||
      typeof author_article !== "string"
    ) {
      next(
        ApiError.badRequest("Les champs doivent être des chaines de caractères")
      );
    } else if (!admin_id) {
      next(
        ApiError.Unauthorized(
          "Vous devez être connecté pour accéder à cette ressource"
        )
      );
    } else {
      res.status(200).json(result);
    }
  });
};

/*READ*/

/*admin i want to see all the articles */
exports.getArticles = (req, res) => {
  const { admin_id } = req.Admin;
  const result = model.getllArticle((error, result) => {
    if (error) {
      next(ApiError.internal("something went wrong"));
    }
    res.status(200).json(result);
  });
};

/*admin i want to get one review*/
exports.getOneReview = (req, res) => {
  const { admin_id } = req.Admin;
  const { id } = req.params;
  model.getAReview(id, (error, result) => {
    if (error) {
      next(ApiError.internal("something went wrong"));
    } else if (!admin_id) {
      next(
        ApiError.Unauthorized(
          "Vous devez être connecté pour accéder à cette ressource"
        )
      );
    }
    res.status(200).json(result);
  });
};

/*admin i want to get all reviews */
exports.getReview = (req, res) => {
  const { admin_id } = req.Admin;
  model.getAllReview((error, result) => {
    if (error) {
      next(ApiError.internal("something went wrong"));
    } else if (!admin_id) {
      next(
        ApiError.Unauthorized(
          "Vous devez être connecté pour accéder à cette ressource"
        )
      );
    }
    res.status(200).json(result);
  });
};

/*admin i want to see the details of an article*/
exports.articleDetails = (req, res) => {
  const { admin_id } = req.Admin;
  const { article_id } = req.params;

  model.getArticleDetails(article_id, (error, result) => {
    if (error) {
      next(ApiError.internal("something went wrong"));
    } else if (!admin_id) {
      next(
        ApiError.Unauthorized(
          "Vous devez être connecté pour accéder à cette ressource"
        )
      );
    }
    res.status(200).json(result);
  });
};

/*UPTDATE*/

/*admin i want to update an article */
exports.updateArticles = (req, res, next) => {
  const { admin_id } = req.Admin;
  const { article_id } = req.params;
  const {
    title,
    img,
    tags,
    resume_article,
    content_article,
    author_article,
    video,
  } = req.body;

  const article = {
    title,
    img,
    tags,
    resume_article,
    content_article,
    author_article,
    video,
  };

  model.updateArticles(article_id, admin_id, article, (error, result) => {
    if (error) {
      next(ApiError.internal("something went wrong"));
    } else if (!admin_id) {
      next(
        ApiError.Unauthorized(
          "Vous devez être connecté pour accéder à cette ressource"
        )
      );
    } else if (
      typeof title !== "string" ||
      typeof tags !== "string" ||
      typeof resume_article !== "string" ||
      typeof content_article !== "string" ||
      typeof author_article !== "string"
    ) {
      next(
        ApiError.badRequest("Les champs doivent être des chaines de caractères")
      );
    } else if (
      typeof title !== "" ||
      typeof tags !== "" ||
      typeof img !== "" ||
      typeof resume_article !== "" ||
      typeof content_article !== "" ||
      typeof author_article !== ""
    ) {
      next(ApiError.badRequest("Les champs ne doivent pas être vides"));
    }
    res.status(200).json(result);
  });
};

/*DELETE*/

/*admin i want to delete an article */
exports.deleteArticles = (req, res) => {
  const { admin_id } = req.Admin;
  const { article_id } = req.params; //
  model.delete_an_article(article_id, (error, result) => {
    if (error) {
      next(ApiError.internal("something went wrong"));
    } else if (!admin_id) {
      next(
        ApiError.Unauthorized(
          "Vous devez être connecté pour accéder à cette ressource"
        )
      );
    }
  });
};

/*admin i want to delete a review */
exports.deleteReview = (req, res) => {
  const { admin_id } = req.Admin;
  const { id } = req.params;

  model.delete_an_review(id, (error, result) => {
    if (error) {
      next(ApiError.internal("something went wrong"));
    } else if (!admin_id) {
      next(
        ApiError.Unauthorized(
          "Vous devez être connecté pour accéder à cette ressource"
        )
      );
    }
    res.status(200).json(result);
  });
};
