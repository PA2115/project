const router = require("express").Router();
const pool = require("../db");

router.post("/locations", async (req, res) => {
    try {
      const { location_store, location_region, head_office, additional_office} = req.body;
      const results = await pool.query(
        "INSERT INTO locations (location_store, location_region, head_office, additional_office) VALUES ($1, $2, $3, $4) RETURNING *",
        [location_store, location_region, head_office, additional_office]
      );
      res.json(results.rows);
    } 
    catch (err){
      console.error(err.message);
    }
    });
    
router.get("/locations", async (req, res) => {
    try {
      const results = await pool.query("SELECT * FROM locations;");
      res.json(results.rows);
    }
     catch (err) {
      console.error(err.message);
    }
  });
  
router.get("/locations/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const results = await pool.query("SELECT * FROM locations WHERE location_id = $1", [id]);
      res.json(results.rows[0]);
    } 
    catch (err) {
      console.error(err.message);
    }
  });

router.put("/locations/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { location_store, location_region, head_office, additional_office } = req.body;
      const updateResults = await pool.query(
        "UPDATE locations SET location_store = $1, location_region = $2, head_office =$3, additional_office = $4 WHERE location_id = $5",
        [location_store, location_region, head_office, additional_office, id]
      );
      res.json("Results was updated!");
    } 
    catch (err) {
      console.error(err.message);
    }
  });
  
router.delete("/locations/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const deleteTodo = await pool.query("DELETE FROM locations WHERE location_id = $1", [
        id
      ]);
      console.log(deleteTodo);
      res.json("Todo was deleted!");
    } catch (err) {
      console.log(err.message);
    }
  });

module.exports = router;