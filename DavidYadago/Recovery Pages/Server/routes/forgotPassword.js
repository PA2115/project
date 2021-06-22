/* eslint-disable max-len */
/* eslint-disable no-console */
const pool = require("../db");
const router = require("express").Router();
const crypto = require("crypto");

/**
 * @swagger
 * /forgotPassword:
 *   post:
 *     tags:
 *       - Users
 *     name: Forgot Password
 *     summary: Sends an email with a reset password link when a user inevitably forgets their password
 *     consumes:
 *       - application/json
 *     parameters:
 *      - name: body
 *        in: body
 *        schema:
 *          $ref: '#/definitions/User'
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *        required:
 *          - email
 *     responses:
 *       '200':
 *         description: Reset email sent
 *       '400':
 *         description: Email required
 *       '403':
 *         description: Email not found in db
 *
 */

const nodemailer = require("nodemailer");

router.post("/", async (req, res) => {
  if (req.body.email === "") {
    res.status(400).send("email required");
  }
  const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
    req.body.email,
  ]);
  if (user.rows[0] === null) {
    res.status(403).send("email not in db");
  } else {
    const token = crypto.randomBytes(20).toString("hex");
    await pool.query(
      "UPDATE users SET resetPasswordToken = $1, resetPasswordExpires = $2 WHERE user_email = $3",
      [token, Date.now() + 600000, req.body.email]
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: `bmgs.mercury@gmail.com`,
        pass: `infinity999@`,
      },
    });

    const mailOptions = {
      from: "bmgs.mercury@gmail.com",
      to: req.body.email,
      subject: "Link To Reset Password",
      text:
        "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
        "Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n" +
        `http://localhost:3000/reset/${token}\n\n` +
        "If you did not request this, please ignore this email and your password will remain unchanged.\n",
    };

    console.log("sending mail");

    transporter.sendMail(mailOptions, (err, response) => {
      if (err) {
        console.error("there was an error: ", err);
      } else {
        console.log("here is the res: ", response);
        res.status(200).json("recovery email sent");
      }
    });
  }
});
module.exports = router;
