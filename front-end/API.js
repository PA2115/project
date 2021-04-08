const express = require('express')
const app = express()
const port = 3001
const cors = require('cors')

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'tan1lba',
    host: 'localhost',
    database: 'tan1lba',
    port: 5433,
})



app.use(cors())
app.use(express.json())



app.get("/", async (req, res) =>{
    try{
        const x = await pool.query('SELECT * FROM user_login WHERE uid = 1');
        res.json(x.rows)
    }catch (err){
        console.error(err.message)
    }
})





app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})

























