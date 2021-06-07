const cookieParser = require("cookie-parser");
const { response } = require("express");
const jwt = require("jsonwebtoken");

const SECRET = "see_you_in_1M_years";

const isAuth = (request, response, next) => {
  const unproccessedAuthorization = request.headers.authorization;

  if (!unproccessedAuthorization) {
    response.status(500).json({
      message: `Token needed.`,
    });
  } else {
    //I_if authorization we retreive the token when an user try to access
    const token = request.headers.authorization.split(" ")[1];

    //II_We check if the token is valid or not
    jwt.verify(token, SECRET, (error, admin) => {
      /*a_error managment*/

      if (error) {
        response.send(error.message);
      } else {
        /*b_checking of token validity*/
        const { id, exp } = admin; // where do we retreive the name?

        /*1_if the cookie experation date is inferior to the actual date then the cookie has expired*/

        // if (Date.now() / 1000 >= exp) {
        //   response.clearCookie("authcookie");
        //   response.send("youre session has expired, try to reconnect you.");
        // } else {
        request.admin = { id };
        next();
        // }
      }
    });
  }
};

module.exports = isAuth;
