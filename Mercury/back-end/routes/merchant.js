const router = require("express").Router();
const pool = require("../db");

router.post("/merchant", async (req, res) => {
    try {
      const { location_store, merchant_name, merchant_category, merchant_phone } = req.body;
      const results_merchant = await pool.query(
        "INSERT INTO merchant (merchant_name, merchant_category, merchant_phone) VALUES ($1, $2, $3) RETURNING *;",
        [merchant_name, merchant_category, merchant_phone]
      );
      const results_other = await pool.query 
      ("INSERT INTO merchant_location ( location_store, merchant_name) VALUES ($1, $2) RETURNING *",
      [ location_store, merchant_name ]);
     
      res.json(results_merchant.rows); 
      res.json(results_other.rows);
    } 
    catch (err) {
      console.error(err.message);
    }
    });
router.get("/merchant", async (req, res) => {
    try {
      const results = await pool.query("SELECT DISTINCT merchant.merchant_name, merchant.merchant_category, merchant.merchant_phone, locations.location_store, locations.location_region, locations.head_office, locations.additional_office FROM merchant_location LEFT JOIN locations ON merchant_location.location_store = locations.location_store LEFT JOIN merchant ON  merchant_location.merchant_name = merchant.merchant_name;");
      res.json(results.rows);
    } 
    catch (err) {
      console.error(err.message);
    }
    });
    
router.get("/merchant/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const results = await pool.query("SELECT merchant_name, merchant_category, merchant_phone FROM merchant WHERE merchant_id = $1", 
      [id]);
      res.json(results.rows[1]);
    } 
    catch (err) {
      console.error(err.message);
    }
    });
    
router.put("/merchant/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const { merchant_name, merchant_category, merchant_phone } = req.body;
        const updateResults = await pool.query(
          "UPDATE merchant SET merchant_name = $1, merchant_category = $2, merchant_phone = $3 WHERE merchant_id = $4 RETURNING *;",
          [  merchant_name, merchant_category, merchant_phone, id]
        );  
      
        res.json("Results was updated!");
        console.log(updateResults);
      } 
      catch (err) {
        console.error(err.message);
      }
});
    
router.delete("/merchant/:merchant_name", async (req, res) => {
    try {
      const { merchant_name } = req.body;
      const deleteResults = await pool.query("DELETE FROM merchant_location WHERE merchant_name = $1 RETURNING *;", 
      [
        merchant_name
      ]);

      // const deleteResults_merchant = await pool.query("DELETE FROM merchant WHERE merchant_name = $1 RETURNING *;", 
      // [merchant_name]);

      res.json("Results was deleted!");
      console.log(deleteResults);
    } catch (err) {
      console.log(err.message);
    }
    });
    
    
    
module.exports = router;