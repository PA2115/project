const router = require("express").Router();
const pool = require("../db");

router.get("/transactions", async (req, res) => {
    try {
      const getTransaction = await pool.query("SELECT DISTINCT * from transactions;");
      res.json(getTransaction.rows);
    } catch (err) {
      console.error(err.message);
    }
  });
router.get("/transactions/top", async (req, res) => {
    try {
      const getTransaction = await pool.query("SELECT  * FROM transactions order by transaction_fee limit 3;");
      res.json(getTransaction.rows);
    } catch (err) {
      console.error(err.message);
    }
  });

 
  
module.exports = router;