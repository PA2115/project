//grab the postgress library's pool object for connecting to postgres db
const Pool = require("pg").Pool;

//create a new pool instance with db credentials for connecting
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "password",
  port: 5432,
  database: "bmg",
});

//to be used in ROUTES for updating, inputting, deleting of data
module.exports = pool;