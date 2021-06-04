const model = require("../model/model");
const bcrypt = require("bcrypt");
const { request } = require("express");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");

/*A_INSCRIPTION */

/*I_creation of a new user*/

exports.signUp = async (request, response) => {
  const { email, user_name, password } = request.body;
  //   console.log("email", email);

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
