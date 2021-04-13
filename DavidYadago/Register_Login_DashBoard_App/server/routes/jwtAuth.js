//Grab the Router for performing modular routes
const router = require("express").Router();
//grab the pool from db.js for making checks with database
const pool = require("../db");
//grab the bcrypt package for hashing member registration pass
const bcrypt = require("bcrypt");
const jwtGenerator = require("../utils/jwtGenerator");
const validInfo = require("../middleware/validInfo");
const authorization = require("../middleware/authorization");

//Registering Route
/*post async server req/res for grabbing inputted register member form fields, querying db
to check if member exists, if so return a server response user exists, if not, hash the
pass using bcrypt, insert the new member and generate a jwt token to send to server res
to be used as user login Authentication
*/
router.post("/register", validInfo, async (req, res) => {
  try {
    //1. destructure the req.body for member registration values (businessname, email, password etc)

    const {
      businessname,
      businessno,
      email,
      password,
      phone,
      state,
      city,
      address,
      postcode,
    } = req.body;

    //2. check if the member exists (If so, then throw an error)
    const member = await pool.query(
      "SELECT * FROM member WHERE member_email = $1",
      [email]
    );

    //checks the retrieved rows from db table, if not 0 that means member exists
    if (member.rows.length !== 0) {
      return res.status(401).send({ message: "User Already Exists" });
    }

    //3. Bcrypt hash the member's pass to protect it in db
    const saltRound = 10;
    //generate a salt using saltround
    const salt = await bcrypt.genSalt(saltRound);

    //use hash method of bcrypt with pass/gen salt input to encrypt/hash pass
    const bcryptPassword = await bcrypt.hash(password, salt);

    //4. insert the new member into the db
    const newMember = await pool.query(
      "INSERT INTO member (business_name, business_no, member_email, member_password, business_phone, business_state, business_city, business_address, business_postcode) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [
        businessname,
        businessno,
        email,
        bcryptPassword,
        phone,
        state,
        city,
        address,
        postcode,
      ]
    );

    //5. generate the jwt token using the JWTGen method created in jwtGen.js file and inputing memberid
    const token = jwtGenerator(newMember.rows[0].member_id);

    res.json({ token });
    //Catch any server errors and print to console and display server error 500
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ message: "Server Error" });
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
  try {
    //1. destructure the req.body
    const { email, password } = req.body;

    //2. check if member doesn't exist (if not then we show error)
    const member = await pool.query(
      "SELECT * FROM member WHERE member_email = $1",
      [email]
    );

    if (member.rows.length === 0) {
      return res.status(401).json("Password or Email is incorrect");
    }

    //3. check if incoming member password is the same as the database password
    const validPassword = await bcrypt.compare(
      password,
      member.rows[0].member_password
    );

    if (!validPassword) {
      return res
        .status(401)
        .json({ message: "Password or Email is Incorrect" });
    }

    //4. provide the jwt token
    const token = jwtGenerator(member.rows[0].member_id);

    res.json({ token });

    //Catch any server errors and print to console and display server error 500
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ message: "Server Error" });
  }
});

router.get("/is-verify", authorization, async (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ message: "Server Error" });
  }
});

//export for use in page Routing in index.js server file
module.exports = router;
