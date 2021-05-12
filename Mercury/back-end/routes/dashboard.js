const router = require("express").Router();
const authorize = require("../middleware/authorize");
const pool = require("../db");


router.get("/", authorize, async (req, res) => {
  try {

    const user = await pool.query(
      "SELECT u.user_name, o.offer_name, o.offer_description, o.offer_expiry, o.offer_type, o.offer_category FROM users AS u INNER JOIN offer AS o ON u.user_id = o.user_id WHERE u.user_id = $1",
      [req.user.id]
    );

    res.json(user.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/offers", authorize, async (req, res) => {
  try {
    console.log(req.body);
    const { offer_name, offer_description, offer_expiry, offer_type, offer_category } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO offer (offer_name, offer_description, offer_expiry, offer_type, offer_category, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;",
      [offer_name, offer_description, offer_expiry, offer_type, offer_category,req.user.id ]
    );
    const result_other = await pool.query 
    ("INSERT INTO offer_merchant (offer_name, merchant_name) VALUES ($1, $2) RETURNING *;",
    [offer_name, req.body.merchant_name]);
 
    res.json(newTodo.rows[0]);
        res.json(result_other.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo

router.put("/offers/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const {  offer_name, offer_description, offer_type, offer_category  } = req.body;
    const updateTodo = await pool.query(
      "UPDATE offer SET offer_name = $1, offer_description =$2,  offer_type = $3, offer_category =$4 WHERE offer_id = $5 AND user_id = $6 RETURNING *;",
      [ offer_name, offer_description, offer_type, offer_category , id, req.user.id]
    );

    if (updateTodo.rows.length === 0) {
      return res.json("This todo is not yours");
    }

    res.json("Todo was updated");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo

router.delete("/offers/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query(
      "DELETE FROM offer AS o WHERE o.offer_id = $1 AND o.user_id = $2 RETURNING *;",
      [id, req.user.id]
    );

    if (deleteTodo.rows.length === 0) {
      return res.json("This Todo is not yours");
    }

    res.json("Todo was deleted");
  } catch (err) {
    console.error(err.message);
  }
});
module.exports = router;