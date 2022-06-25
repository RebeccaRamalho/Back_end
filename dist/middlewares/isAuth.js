"use strict";

require("dotenv").config();

var jwt = require("jsonwebtoken"); // const SECRET = process.env.SECRET;
// const SECRET = "see_you_in_1M_years";
//


var isAuth = function isAuth(req, res, next) {
  console.log("request Headers", req.headers);
  var authorization = req.headers.authorization || req.body.headers.Authorization;

  try {
    if (!authorization) {
      res.status(400).json({
        message: "veuillez vous connecter !"
      });
    } else {
      var token = authorization.replace("Bearer ", "");
      console.log("auth", authorization);
      console.log("TOK", token);
      jwt.verify(token, process.env.JWT_SECRET, function (error, Admin) {
        if (error) {
          console.log("AUTHORIZATION ERROR ", error), res.status(400).json({
            message: "Vous n'avez pas l'autorisation pour acceder à cette page !"
          });
        }

        var admin_id = Admin.admin_id,
            user_name = Admin.user_name;
        req.Admin = {
          admin_id: admin_id,
          user_name: user_name
        }; //ce qu'il faudra peut-être récup dans la requête post  Admin.admin_id

        next();
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Désolé, vous n’êtes pas autorisé à accéder à cette page !"
    });
  }
};

module.exports = isAuth;