//grab the json webtoken package
const jwt = require("jsonwebtoken");
//Allow access to our environment vars
require("dotenv").config();

//generate a JWT token using a JWT generator function that returns a signed JWt token
function jwtGenerator(member_id) {
  //create payload containing our userid
  const payload = {
    member: member_id,
  };
  //sign and create a token using payload, JWTSecret in .env file and set token exp time
  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1hr" });
}

module.exports = jwtGenerator;
