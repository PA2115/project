//grab the json web token library to use
const jwt = require("jsonwebtoken");
//grab the dotenv config to get the secret password for checking
require("dotenv").config();

module.exports = function (req, res, next) {
  //fetch the jwt token from the server request header
  const token = req.header("jwt_token");

  //check if a token exists
  if (!token) {
    return res.status(403).json({ msg: "authorization denied" });
  }

  try {
    /*check if provided JWT token from server req header is valid using verify meth of j
      wt and checking against our jwtSecret pass stored in .env file*/
    const verify = jwt.verify(token, process.env.jwtSecret);

    //finally return to the server req routes the payload with member info
    req.user = verify.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};
