const cookieParser = require("cookie-parser");
const { response } = require("express");
const jwt = require("jsonwebtoken");

const SECRET = "see_you_in_1M_years";

const isAuth = (request, response, next) => {
  const unproccessedAuthorization = request.body.headers.authorization;
  if (!unproccessedAuthorization) {
    // console.log("if",request.body.headers.authorization);
    response.status(500).json({
      message: `Token needed.`,
      
    });
  } else {
    console.log("else");
    // console.log(request.body.headers.authorization.split(" ")[1]);
    //I_if authorization we retreive the token when an user try to access
    const token = request.body.headers.authorization.split(" ")[1];

    //II_We check if the token is valid or not
    jwt.verify(token, SECRET, (error, admin) => {
      /*a_error managment*/

      if (error) {
        response.send(error.message);
      } else {
        /*b_checking of token validity*/
        const { id } = admin; // where do we retreive the name?

        request.admin = { id };
        next();
      }
    });
  }
};

module.exports = isAuth;
