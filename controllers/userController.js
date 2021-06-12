const model = require("../model/model");
const bcrypt = require("bcrypt");
const { request } = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");

const SECRET = "see_you_in_1M_years";
const MAXAGE = Math.floor(Date.now() / 1000) + 60 * 60; // 1 hour of expiration

/*A_INSCRIPTION */

/*I_creation of a admin*/

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

/*A_Authentification */

exports.login = async (request, response) => {
  const { email, user_name, password } = request.body;
 
  try {
    await model.getAdmin(
      email /*what i send to the model*/,
      (error, result) /*what i get from the model*/ => {
        /*1-Error managment */
        /*a_Server error managment*/
        if (error) {
          response.send(error.message);
        } else if (result.length == 0) {
          /*b_User error managment (i check if username already exist in db)*/
          response.status(409).json({
            message: "Email doesn't exist in the db",
          });
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

            // console.log("resulzzzt", result[0].admin_id);

            jwt.sign(Admin, SECRET, (error, token) => {
              if (error) {
                response.status(500).json({
                  message: "Server Error",
                });
              }
              request.Admin = Admin;

              // const authUserId = result.id;
              response.cookie("authcookie", token, { maxAge: MAXAGE });
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
      }
    );
  } catch (error) {
    console.error(error);
  }
};

/*B_Logout*/

exports.logout = (request, response) => {
  response.clearCookie("authcookie");
};
