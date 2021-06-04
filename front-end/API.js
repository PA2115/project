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



//GET all distributed offers by suburb (will work on by suburb+state later)
app.post('/getDistros',  async (req, res) => {

    try{
        const x = await pool.query('SELECT offer.offer_name, location.suburb, industries.industry_type FROM distribution_of_offers INNER JOIN offer ON distribution_of_offers.offer_id = offer.offer_id INNER JOIN location ON distribution_of_offers.location_id = location.location_id INNER JOIN industries ON offer.industry_id = industries.industry_id')
        res.send(x.rows)
    }catch (err){
        console.error(err.message)
    }

})

//get any offers (by name) that HAVE been distributed. select by DISTINCT to avoid doubling up on results:
app.post('/getDistroOffers',  async (req, res) => {

    try{
        const x = await pool.query('SELECT DISTINCT(offer.offer_name), offer.offer_id FROM distribution_of_offers INNER JOIN offer ON offer.offer_id = distribution_of_offers.offer_id;')
       res.send(x.rows)

        console.log(x.rows)
    }catch (err){
        console.error(err.message)
    }


})
app.post('/test',  async (req, res) => {

    try{
        console.log("body content", req.body.offer_id)

        const x = await pool.query('SELECT DISTINCT location.suburb FROM distribution_of_offers INNER JOIN offer ON offer.offer_id = distribution_of_offers.offer_id INNER JOIN location ON distribution_of_offers.location_id= location.location_id WHERE distribution_of_offers.offer_id = $1', [req.body.offer_id])

        console.log(x.rows)
        res.send(x.rows)

    }catch (err){
        console.error(err.message)
    }

})

//POST new user
app.post('/insertUser',  async (req, res) => {

    const data = {

        username: req.body.username,
        password: req.body.password,
        role_type: req.body.role_type,

    }

    const values = [data.username, data.password, data.role_type]

    try{

        const retrieved = await pool.query('INSERT INTO users (username, password, role_type) VALUES ($1, $2, $3)', values)
                            .then(pool.query('INSERT INTO users (username, password, role_type) VALUES ($1, $2, $3)', values))
        console.log(res.json(retrieved.rows))


    }catch (err){
        console.error(err.message)
    }

})

//POST new merchant location
app.post('/insertMerchantLocation',  async (req, res) => {

    const data = {
        merchant_id: req.body.merchant_id,
        location_id: req.body.location_id,
    }

    const values = [data.merchant_id, data.location_id]

    try{
        const retrieved = await pool.query('INSERT INTO merchant_locations (merchant_id, location_id) VALUES ($1, $2)', values)
        console.log(res.json(retrieved.rows))

    }catch (err){
        console.error(err.message)
    }

})

//POST new merchant
app.post('/insertMerchant',  async (req, res) => {

    const data = {
        merchant_name: req.body.merchant_name,
        industry_id: req.body.industry_id,
    }

    const values = [data.merchant_name, data.industry_id]

    try{
        const retrieved = await pool.query('INSERT INTO merchant (merchant_name, industry_id) VALUES ($1, $2)', values)
        console.log(res.json(retrieved.rows))

    }catch (err){
        console.error(err.message)
    }

})



//POST offers into a distribution:
app.post('/createDistro',  async (req, res) => {

    const data = {

        suburb: req.body.suburb,
        state: req.body.state,
        region: req.body.region,

    }

    const values = [data.suburb, data.state, data.region]

    try{
        const retrieved = await pool.query('INSERT INTO location (suburb, state, region) VALUES ($1, $2, $3)', values)
        console.log(res.json(retrieved.rows))

    }catch (err){
        console.error(err.message)
    }

})

//POST locations into location DB:
app.post('/insertLocation',  async (req, res) => {

    const data = {

        suburb: req.body.suburb,
        state: req.body.state,
        region: req.body.region,

    }

    const values = [data.suburb, data.state, data.region]

    try{
        const retrieved = await pool.query('INSERT INTO location (suburb, state, region) VALUES ($1, $2, $3)', values)
        console.log(res.json(retrieved.rows))

    }catch (err){
        console.error(err.message)
    }

})

//GET all locations into location DB:
app.get('/showLocations',  async (req, res) => {

    try{
        const x = await pool.query('SELECT suburb, state, region FROM location')
        res.send(x.rows)
    }catch (err){
        console.error(err.message)
    }

})

//GET locations for specific merchant (in this example id=5)
app.get('/showMerchantLocations',  async (req, res) => {

    try{
        const x = await pool.query('SELECT merchant.merchant_name, location.region, location.state, location.suburb FROM merchant_locations INNER JOIN merchant ON merchant.merchant_id = merchant_locations.merchant_id INNER JOIN location ON merchant_locations.location_id = location.location_id WHERE merchant.merchant_id = 5\n')
        res.send(x.rows)
    }catch (err){
        console.error(err.message)
    }

})


//GET all offers from offer DB:
app.get('/grabOffers', async(req,res)=> {


    try{
        const x = await pool.query('SELECT * FROM offer')
        res.send(x.rows)
    }catch (err){
        console.error(err.message)
    }


})


//POST offers into offer DB:
app.post('/insertOffers',  async (req, res) => {

    const data = {

        name: req.body.offer_name,
        description: req.body.offer_desc,
        expiry: req.body.offer_expiry,
        industry: req.body.industry_id

    }

    const values = [data.name, data.description, data.expiry, data.industry]

    try{
        const retrieved = await pool.query('INSERT INTO offer (offer_name, offer_desc, offer_expiry, industry_id) VALUES ($1, $2, $3, $4)', values)
        console.log(res.json(retrieved.rows))

    }catch (err){
        console.error(err.message)
    }

})

//get transactions that have been SHARED and calculate reach
app.post('/sharedTransactions',  async (req, res) => {

    try{
        const retrieved = await pool.query('SELECT COUNT(shared_action) * 100 AS reach, location.suburb, location.state FROM transaction INNER JOIN location ON location.location_id = transaction.location_id WHERE shared_action=\'yes\' GROUP BY location.suburb, location.state;')
        console.log(res.json(retrieved.rows))

    }catch (err){
        console.error(err.message)
    }

})

//Create new transaction
app.post('/newTransaction',  async (req, res) => {

    const data = {

        shared_action: req.body.shared_action,
        offer_id: req.body.offer_id,
        location_id: req.body.location_id,
        merchant_id: req.body.merchant_id

    }

    const values = [data.shared_action, data.offer_id, data.location_id, data.merchant_id]

    try{
        const retrieved = await pool.query('INSERT INTO transaction (transaction_id, shared_action, offer_id, location_id, merchant_id) VALUES (NEXTVAL(\'transaction_transaction_id_seq1\'), $1, $2, $3, $4)', values)
        console.log(res.json(retrieved.rows))

    }catch (err){
        console.error(err.message)
    }

})

//get transactions that have been SHARED and calculate reach
app.post('/sharedTransactions',  async (req, res) => {

    try{
        const retrieved = await pool.query('SELECT COUNT(shared_action) * 100 AS reach, location.suburb, location.state FROM transaction INNER JOIN location ON location.location_id = transaction.location_id WHERE shared_action=\'yes\' GROUP BY location.suburb, location.state;')
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



