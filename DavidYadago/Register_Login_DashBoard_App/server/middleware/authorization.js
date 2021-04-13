//grab the json web token library to use
const jwt = require("jsonwebtoken");
//grab the dotenv config to get the secret password for checking
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    //fetch the jwt token from the server request header
    const jwtToken = req.header("token");

    //check if a token exists
    if (!jwtToken) {
      return res.status(403).json("Not Authorized");
    }

    /*check if provided JWT token from server req header is valid using verify meth of j
        wt and checking against our jwtSecret pass stored in .env file*/
    const payload = jwt.verify(jwtToken, process.env.jwtSecret);

    //finally return to the server req routes the payload with member info
    req.member = payload.member;
  } catch (err) {
    console.error(err.message);
    return res.status(403).json("Not Authorized");
  }
};
