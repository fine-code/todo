const config = require("./config");
const Pool = require("pg").Pool;
//connect server to database
const pool = new Pool({
    user: config.USER, 
    password: config.PASSWORD,
    host: config.HOST,
    port: config.PORT,
    database: config.DATABASE
});

module.exports = pool;
