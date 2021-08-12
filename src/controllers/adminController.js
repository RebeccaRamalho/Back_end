const model = require("../model/adminModel");
const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const ApiError = require("../error/ApiError")

const SECRET = "see_you_in_1M_years";
const MAXAGE = Math.floor(Date.now() / 1000) + 60 * 60; // 1 hour of expiration

/*A_ATUHENTIFICATION */

/*I_Inscription*/

exports.signUp = async (request, response) => {
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
          response.status(409).json({
            message:
              "You have a great taste! An user with this email already exist in db, sorry! :(",
          });
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
            const admin = {
              email,
              user_name,
              password: hash,
            };


            /*c_we send user's data to the model*/
            model.createAccount(admin, (error, result) => {
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
      /*1-Error managment */
      /*a_Server error managment*/
      if (error) {
        next(ApiError.internal('something went wrong'))

      } else if (result.length == 0) {
        //
        next(ApiError.Conflict("l'email n'existe pas dans la base de donnée"))

      } else if (email === "" || user_name === "" || password === "") {
        next(ApiError.badRequest('Les champs doivent être remplis'))

      } else if (
        typeof email !== "string" ||
        typeof user_name !== "string" ||
        typeof password !== "string"
      ) {
        next(ApiError.badRequest("Les champs doivent être des chaînes de caractères"))

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
            id: result[0].admin_id,
            user_name: result[0].user_name,
            password: result[0].password,
            email: result[0].email,
            exp: MAXAGE,
          };

          jwt.sign(Admin, SECRET, (error, token) => {
            if (error) {
              response.status(500).json({
                message: "Server Error",
              });
            }
            request.Admin = Admin;           
            //
            response.cookie("authcookie", token, { maxAge: MAXAGE });
            //
            // localStorage.setItem('tokens', JSON.stringify(token));
            //
            response.status(200).json({
              token: token,
              Admin: {
                id: result[0].admin_id,
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

/*III_Logout*/

exports.logout = (request, response) => {
  response.clearCookie("authcookie");
};

/*B_CRUD REQUEST NOT RELATED TO AUTHENTIFICATION**/

/*CREATE*/

/*admin i want to create an article*/
exports.publishArticles = (req, res, next) => {
  const {
    title,
    img,
    tags,
    resume_article,
    content_article,
    author_article,
    video,
    admin_id,
  } = req.body;

  const article = {
    title,
    img,
    tags,
    resume_article,
    content_article,
    author_article,
    video,
    admin_id,
  };

  model.createArticle(article, (error, result) => {
    if (error) {
      next(ApiError.internal('something went wrong'))
    } else if (
      title === "" ||
      img === "" ||
      tags === "" ||
      resume_article === "" ||
      content_article === "" ||
      author_article === "" ||
      video === "" ||
      admin_id === ""
    ) {
      next(ApiError.badRequest('Les champs doivent être remplis'))
    }
    else{
      res.status(200).json(result);
    }
  });
};

/*READ*/

/*admin i want to see all the articles */
exports.getArticles = (req, res) => {
  model.getllArticle((error, result) => {
    if (error) {
      res.send(error.message);
    }
    res.status(200).json(result);
  });
};

/*admin i want to get all reviews */
exports.getReview = (req, res) => {
  model.getAllReview((error, result) => {
    if (error) {
      res.send(error.message);
    }
    res.status(200).json(result);
  });
};

/*admin i want to see the details of an article*/
exports.articleDetails = (req, res) => {
  const { article_id } = req.params;

  model.getArticleDetails(article_id, (error, result) => {
    if (error) {
      res.send(error.message);
    }
    res.status(200).json(result);
  });
};

/*UPTDATE*/

/*admin i want to update an article */
exports.updateArticles = (req, res) => {
  const { id } = req.admin;
  // const {article_id} = req.params;

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
    id,
  };

  model.updateArticles(article_id, article, id, (error, result) => {
    if (error) {
      res.send(error.message);
    }
    res.status(200).json(result);
  });
};

/*DELETE*/

/*admin i want to delete an article */
exports.deleteArticles = (req, res) => {
  const { article_id } = req.params; //
  model.delete_an_article(article_id, (error, result) => {
    if (error) {
      res.send(error.message);
    }
  });
};

/*admin i want to delete a review */
exports.deleteReview = (req, res) => {
  const { id } = req.params;

  model.delete_an_review(id, (error, result) => {
    if (error) {
      res.send(error.message);
    }
    res.status(200).json(result);
  });
};
