const  mysql = require("mysql2£");
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
db.connect((error) => error ? console.log('error', error): console.log("connected to the handofhope db"));

module.exports = db;