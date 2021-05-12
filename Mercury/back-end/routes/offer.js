const router = require("express").Router();
const pool = require("../db");

router.post("/offer", async (req, res) => {
    try {
      const {offer_name, offer_description, offer_expiry, offer_type, offer_category, offer_action, merchant_name} = req.body;
      const result_offer = await pool.query 
      ("INSERT INTO offer(offer_name, offer_description, offer_expiry, offer_type, offer_category, offer_action) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;",
      [offer_name, offer_description, offer_expiry, offer_type, offer_category, offer_action]);
  
     
      res.json(result_offer.rows);
      
      if(res == 200){
        res.json("Post successful");
      }
    } catch (err) {
      console.error(err.message);
    }
    if (err) {
      next(err); 
  }
  });
router.get("/offer", async (req, res) => {
    try {
      const results = await pool.query
      ("SELECT o.offer_name, o.offer_description, o.offer_expiry, o.offer_type, o.offer_category, o.offer_action, m.merchant_name, m.merchant_category from offer_merchant AS om INNER JOIN offer AS o ON om.offer_name = o.offer_name INNER JOIN merchant AS m ON om.merchant_name = m.merchant_name;");
      res.json(results.rows);
    } catch (err) {
      console.error(err.message);
    }
  });
  
router.get("/offer/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const results = await pool.query("SELECT * FROM offer WHERE offer_id = $1", [id]);
      res.json(results.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
    if (err) {
      next(err); 
    }
});
  
router.put("/offer/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { offer_name, offer_expiry, offer_type,offer_category, offer_action } = req.body;
      const updateResults = await pool.query("UPDATE offer SET offer_name = $2, offer_type = $3,  offer_category = $4, offer_action = $5, offer_expiry = $6 WHERE offer_id = $1",
      [id, offer_name, offer_type, offer_category, offer_action, offer_expiry]);
      res.json("Results was updated!");
    } 
    catch (err) {
      console.error(err.message);
    }
});
  
router.delete("/offer/:offer_name", async (req, res) => {
    try {
      const delete_results = await pool.query("DELETE FROM offer_merchant WHERE offer_name = $1", 
      [req.body.offer_name]);

      const delete_results_t = await pool.query("DELETE FROM offer WHERE offer_name = $1", 
      [offer_name]);

      res.json("Results was deleted!");
    } catch (err) {
      console.log(err.message);
    }
});


module.exports = router;
 