const router = require("express").Router();
const pool = require("../db");
const authorization = require("../middleware/authorization");

router.get("/", authorization, async (req, res) => {
  try {
    //req.user contains the member payload info
    //res.json(req.member);

    const member = await pool.query(
      "SELECT business_name FROM member WHERE member_id = $1",
      [req.member]
    );

    res.json(member.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
