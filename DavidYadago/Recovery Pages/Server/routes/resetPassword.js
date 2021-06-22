/* eslint-disable no-console */
/* eslint-disable max-len */
const pool = require("../db");
const router = require("express").Router();

/**
 * @swagger
 * /reset:
 *   get:
 *     tags:
 *       - Users
 *     name: Reset Password Link
 *     summary: Create validation string in reset password link to verify user's allowed to reset their password
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: resetPasswordToken
 *         in: query
 *         schema:
 *           type: string
 *         required:
 *           - resetPasswordToken
 *     responses:
 *       '200':
 *         description: User's password reset link is valid
 *       '403':
 *         description: Password reset link is invalid or has expired
 */

router.get("/", async (req, res) => {
  const user = await pool.query(
    "SELECT * FROM users WHERE resetpasswordtoken = $1 AND resetpasswordexpires > $2",
    [req.query.resetPasswordToken, Date.now()]
  );

  if (user.rows[0] === null) {
    console.error("password reset link is invalid or has expired");
    res.status(403).send("password reset link is invalid or has expired");
  } else {
    res.status(200).send({
      username: user.rows[0].user_email,
      message: "password reset link a-ok",
    });
  }
});
module.exports = router;
