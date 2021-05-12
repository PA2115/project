const router = require("express").Router();
const pool = require("../db");

router.post("/distributions", async (req, res) => {
    try {
      const results = await pool.query("INSERT INTO distribution (distribution_name, distribution_description, distribution_type, offer_id, merchant_id) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
      [req.body.distribution_name, req.body.distribution_description, req.body.distribution_type, req.params.distribution_id, req.params.distribution_id]);
      res.json(results.rows);
    } 
    catch (err) 
    {
      console.error(err.message);
    }
 
});
  
router.get("/distributions", async (req, res) => {
    try {
      const results = await pool.query("SELECT DISTINCT m.*, o.* from offer_merchant AS om INNER JOIN offer AS o ON om.offer_name = o.offer_name INNER JOIN merchant AS m ON om.merchant_name = m.merchant_name;");
      res.json(results.rows);
    } catch (err) 
    {
      console.error(err.message);
    } 
});
router.get("/distributions/:distribution_id", async (req, res) => {
    try {
      const { distribution_id } = req.params;
      const get = await pool.query("SELECT * FROM distribution WHERE distribution_id = $1", [distribution_id]);
      res.json(get.rows[0]);
    } catch (err) 
    {
      console.error(err.message);
    } 
  });
router.get("/distributedOffers", async (req, res) => {
    try {
      const get = await pool.query("SELECT distribution_name, distribution_description, distribution_type from distribution;");
      res.json(get.rows);
    } 
    catch (err)
    {
      console.error(err.message);
    }
});

module.exports = router;
 