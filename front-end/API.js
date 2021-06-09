const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3001
const cors = require('cors')


//to connect to LOCALLY HOSTED postgresql db
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'tan1lba',
    host: 'localhost',
    database: 'Mercury',
    port: 5433,
})


app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//get transactions that have been SHARED and calculate reach
app.post('/sharedTransactions',  async (req, res) => {

    try{
        const retrieved = await pool.query('SELECT COUNT(share_id) * 100 AS reach, transaction.offer_id,  locations.location_state, locations.location_region  FROM shares INNER JOIN transaction ON shares.transaction_id = transaction.transaction_id INNER JOIN locations ON transaction.location_id = locations.location_id GROUP BY transaction.offer_id, locations.location_state, locations.location_region')
        console.log(res.json(retrieved.rows))

    }catch (err){
        console.error(err.message)
    }

})


//calculate CPA by getting total transactions for any given offer and using that sum to divide into $1000 (as an example)
app.post('/calcCPA',  async (req, res) => {

    try{
        const retrieved = await pool.query('SELECT 1000 / COUNT(transaction.offer_id)  AS example_count, offer.offer_name FROM transaction INNER JOIN offer ON offer.offer_id = transaction.offer_id GROUP BY offer.offer_name')
        console.log(res.json(retrieved.rows))

    }catch (err){
        console.error(err.message)
    }

})

//Output to console to check that express app is online and working:
app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})



