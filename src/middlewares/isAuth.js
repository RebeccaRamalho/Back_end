const { req, request } = require("express");
const SECRET = process.env.SECRET;
const jwt = require("jsonwebtoken");

const isAuth = (req, res, next) => {
  ///////////////// je récupère le " authcookie " <= nom du cookie créer à la connection de l'utilisateur
  // const authorization = await req.cookies.authcookie; <= COOKIE PASSER AU ISAUTH
  console.log("AUTHORIZATION Token", req.headers);
  const authorization = req.headers.authorization;

  try {
    if (!authorization) {
      res.status(400).json({ message: "invalid token !" });
    } else {
      const token = authorization.replace("Bearer ", "");
      console.log("TOKEEEEN IS AUTH", token);
      //////////////// " .verify " permet de vérifier si le token existe
      jwt.verify(token, SECRET, (error, user) => {
        if (error) {
          console.log("AUTHORIZATION ERROR ", error),
            res.status(400).json({
              message:
                "Vous n'avez pas l'autorisation pour acceder à cette page !",
            });
        }
        // user = req.body.userId;
        // console.log("PAYLOAD isAuth", req.body.userId);
        const { id } = admin; // where do we retreive the name?
        request.admin = { id };
        next();
      });
    }
  } catch (error) {
    console.log("ERROR", error);
    res.status(500).json({
      message: "Désolé, vous n’êtes pas autorisé à accéder à cette page !",
    });
  }
};
module.exports = isAuth;

// const cookieParser = require("cookie-parser");
// const { response } = require("express");
// const jwt = require("jsonwebtoken");

// const SECRET = "see_you_in_1M_years";

// const isAuth = (request, response, next) => {
//   const unproccessedAuthorization = request.headers.authorization;
//   // console.log("REQ", request.headers.authorization);

//   if (!unproccessedAuthorization) {
//     response.status(500).json({
//       message: `Token needed.`,
//     });
//   } else {
//     // I_if authorization we retreive the token when an user try to access
//     const token = request.headers.authorization.split(" ")[1];
   
//     // II_We check if the token is valid or not
//     jwt.verify(token, SECRET, (error, admin) => {
//       /*a_error managment*/

//       if (error) {
//         response.send(error.message);
//       } else {
//         /*b_checking of token validity*/
//         const { id } = admin; // where do we retreive the name?

//         request.admin = { id };
       
//         next();
//       }
//     });
//   }
// };

// module.exports = isAuth;
