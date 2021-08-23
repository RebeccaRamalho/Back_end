require("dotenv").config();
const jwt = require("jsonwebtoken");

// const SECRET = process.env.SECRET;
// const SECRET = "see_you_in_1M_years";
//

const isAuth = (req, res, next) => {
  console.log("request Headers", req.body);

  const authorization =
    req.headers.authorization || req.body.headers.Authorization;

  try {
    if (!authorization) {
      res.status(400).json({ message: "veuillez vous connecter !" });
    } else {
      const token = authorization.replace("Bearer ", "");

      console.log("TOK", token);

      jwt.verify(token, process.env.JWT_SECRET, (error, Admin) => {
        if (error) {
          console.log("AUTHORIZATION ERROR ", error),
            res.status(400).json({
              message:
                "Vous n'avez pas l'autorisation pour acceder à cette page !",
            });
        }
        const { admin_id, user_name } = Admin;
        req.Admin = { admin_id, user_name };

        //ce qu'il faudra peut-être récup dans la requête post  Admin.admin_id

        next();
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Désolé, vous n’êtes pas autorisé à accéder à cette page !",
    });
  }
};

module.exports = isAuth;
