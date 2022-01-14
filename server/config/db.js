const mySql = require('mysql2');
//env file
require('dotenv').config()

//sql connection
let pool = mySql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    multipleStatements: true
});

module.exports = pool