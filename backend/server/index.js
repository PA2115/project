const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json()); //req.body


//create todo - works
app.post("/bmgs", async (req, res) => {
    try {
      console.log(req.body);
      const {offer_number, offer_take_up_location, offer_use_location, offer_user, offer_use_date, offer_use_time, offer_use_amount, offer_remaining, total_sale_value, repeat_visit_sales_value } = req.body;
      const newTodo = await pool.query(
        "INSERT INTO offer (offer_number, offer_take_up_location, offer_use_location, offer_user, offer_use_date, offer_use_time, offer_use_amount, offer_remaining, total_sale_value, repeat_visit_sales_value) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *", [
          offer_number, offer_take_up_location, offer_use_location, offer_user, offer_use_date, offer_use_time, offer_use_amount, offer_remaining, total_sale_value, repeat_visit_sales_value
        ]);
      
      res.json(newTodo.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });
//get all - working
app.get("/bmgs", async (req, res) => {
    try {
      const allTodos = await pool.query("SELECT * FROM offer");
      res.json(allTodos.rows);
    } catch (err) {
      console.error(err.message);
    }
  });
//get a todo - working
app.get("/bmgs/:offer_code", async (req, res) => {
    try {
      const { offer_code } = req.params;
      const todo = await pool.query("SELECT * FROM offer WHERE offer_code = $1", [
        offer_code
      ]);
  
      res.json(todo.rows[0]);
    } catch (err) {
      console.error(err.message);
    }
  });


//update todo works
app.put("/bmgs/:offer_code", async (req, res) => {
  try {
    const { offer_code } = req.params;
    const { offer_number, offer_take_up_location, offer_use_location, offer_user, offer_use_date, offer_use_time, offer_use_amount, offer_remaining, total_sale_value, repeat_visit_sales_value } = req.body;
    const updateTodo = await pool.query(
      "UPDATE offer SET offer_number = $2, offer_take_up_location = $3, offer_use_location = $4, offer_user = $5, offer_use_date = $6, offer_use_time = $7, offer_use_amount = $8, offer_remaining = $9, total_sale_value = $10, repeat_visit_sales_value = $11 WHERE offer_code = $1",
      [offer_code, offer_number, offer_take_up_location, offer_use_location, offer_user, offer_use_date, offer_use_time, offer_use_amount, offer_remaining, total_sale_value, repeat_visit_sales_value]
    );

    res.json("Todo was updated!");
  } catch (err) {
    console.error(err.message);
  }
});
//delete todo

app.delete("/bmgs/:offer_code", async (req, res) => {
  try {
    const { offer_code } = req.params;
    const deleteTodo = await pool.query("DELETE FROM offer WHERE offer_code = $1", [
      offer_code
    ]);
    res.json("Todo was deleted!");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(5000, () => {
    console.log("Server started on port 5000");
});