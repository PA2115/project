//Grab the Router for performing modular routes
const express = require("express");
const router = express.Router();
//grab the bcrypt package for hashing member registration pass
const bcrypt = require("bcrypt");
//grab the pool from db.js for making checks with database
const pool = require("../db");
const validInfo = require("../middleware/validInfo");
const jwtGenerator = require("../utils/jwtGenerator");
const authorize = require("../middleware/authorize");

//Authorization
//Registering Route
/*post async server req/res for grabbing inputted register member form fields, querying db
to check if member exists, if so return a server response user exists, if not, hash the
pass using bcrypt, insert the new member and generate a jwt token to send to server res
to be used as user login Authentication
*/
router.post("/register", validInfo, async (req, res) => {
  //1. destructure the req.body for member registration values (businessname, email, password etc)
  const {
    email,
    name,
    password,
    businessno,
    businessphone,
    businessstate,
    businesscity,
    businessaddress,
    businesspostcode,
  } = req.body;

  try {
    //2. check if the member exists (If so, then throw an error)
    const user = await pool.query(
      "SELECT * FROM member WHERE member_email = $1",
      [email]
    );

    //checks the retrieved rows from db table, if not 0 that means member exists
    if (user.rows.length > 0) {
      return res.status(401).json("User already exist!");
    }

    //generate a salt using saltround of 10
    const salt = await bcrypt.genSalt(10);
    //use hash method of bcrypt with pass/gen salt input to encrypt/hash pass
    const bcryptPassword = await bcrypt.hash(password, salt);

    //4. insert the new member into the Member table in db
    let newUser = await pool.query(
      "INSERT INTO member (business_name, member_email, member_password, business_no, business_phone, business_state, business_city, business_address, business_postcode) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [
        name,
        email,
        bcryptPassword,
        businessno,
        businessphone,
        businessstate,
        businesscity,
        businessaddress,
        businesspostcode,
      ]
    );

    //5. generate the jwt token using the JWTGen method created in jwtGen.js file and inputing memberid
    const jwtToken = jwtGenerator(newUser.rows[0].member_id);

    return res.json({ jwtToken });
    //Catch any server errors and print to console and display server error 500
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//Login Route
/*post async server req/res for grabbing inputted register member form fields, querying db
to check if member exists, if not return a server response user does not exists, 
then check inputed pass against hashed pass using bcrypt, if incorrect also generate
user does not exists and finally generate a jwt token to send to server res
to be used as user login Authentication
*/
router.post("/login", validInfo, async (req, res) => {
  //1. destructure the req.body
  const { email, password } = req.body;

  try {
    //2. check if member doesn't exist (if not then we show error)
    const user = await pool.query(
      "SELECT * FROM member WHERE member_email = $1",
      [email]
    );

    if (user.rows.length === 0) {
      return res.status(401).json("Invalid Credential");
    }

    //3. check if incoming member password is the same as the database password
    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].member_password
    );

    if (!validPassword) {
      return res.status(401).json("Invalid Credential");
    }

    //4. provide the jwt token
    const jwtToken = jwtGenerator(user.rows[0].member_id);
    return res.json({ jwtToken });

    //Catch any server errors and print to console and display server error 500
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/verify", authorize, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

//export for use in page Routing in index.js server file
module.exports = router;
