/* eslint-disable no-console */
const validInfo = require("../middleware/validInfo");
const bcrypt = require("bcrypt");
const pool = require("../db");
const router = require("express").Router();

/**
 * @swagger
 * /updatePasswordViaEmail:
 *   put:
 *     tags:
 *       - Users
 *     name: Update user's password
 *     summary: Update user's password after they've forgotten it
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: body
 *         schema:
 *           $ref: '#/definitions/User'
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *             resetPasswordToken:
 *               type: string
 *         required:
 *           - username
 *           - password
 *           - resetPasswordToken
 *     responses:
 *       '200':
 *         description: User's password successfully updated
 *       '401':
 *         description: No user found in the database to update
 *       '403':
 *         description: Password reset link is invalid or has expired
 */

const BCRYPT_SALT_ROUNDS = 12;
router.put("/", async (req, res) => {
  function validPassword(userPassword) {
    return /^(?:(?=.*[a-z])(?:(?=.*[A-Z])(?=.*[\d\W])|(?=.*\W)(?=.*\d))|(?=.*\W)(?=.*[A-Z])(?=.*\d)).{8,}/.test(
      userPassword
    );
  }

  var bcryptPassword = null;
  const user = await pool.query(
    "SELECT * FROM users WHERE user_email = $1 AND resetpasswordtoken = $2 AND resetpasswordexpires > $3",
    [req.body.username, req.body.resetPasswordToken, Date.now()]
  );

  if (user.rows[0] == null) {
    console.error("password reset link is invalid or has expired");
    res.status(403).send("password reset link is invalid or has expired");
  } else if (user.rows[0] != null) {
    if (!validPassword(req.body.password)) {
      return res.status(200).send({ message: "Password" });
    } else {
      bcryptPassword = await bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS);

      const userupdate = await pool
        .query(
          "UPDATE users SET user_password = $1, resetpasswordtoken = $2, resetpasswordexpires = $3 WHERE user_email = $4",
          [bcryptPassword, null, null, req.body.username]
        )
        .then(() => {
          res.status(200).send({ message: "password updated" });
        });
    }
  } else {
    console.error("no user exists in db to update");
    res.status(401).json("no user exists in db to update");
  }
});
module.exports = router;
