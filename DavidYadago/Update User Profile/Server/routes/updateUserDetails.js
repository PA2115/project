const router = require("express").Router();
const pool = require("../db");

router.post("/", async (req, res) => {
  const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
    req.body.email,
  ]);

  var update = false;
  var current = false;
  console.log(req.body.email);
  console.log(req.body.oldemail);

  if (req.body.email === req.body.oldemail) {
    update = true;
    current = true;
  }
  if (user.rows[0] && current === false) {
    update = false;
    return res.json("Email already in use. Please try a different email.");
  } else {
    update = true;
  }

  if (update) {
    const updated = await pool.query(
      "UPDATE users SET user_name = $1, user_email = $2, user_company = $3, user_address = $4 WHERE user_email = $5",
      [
        req.body.name,
        req.body.email,
        req.body.company,
        req.body.address,
        req.body.oldemail,
      ]
    );
    res.status(200).json("updated");
  } else {
    res.status(200).json("failed");
  }
});

module.exports = router;
