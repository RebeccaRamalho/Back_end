"use strict";

var mysql = require("mysql2");

require("dotenv").config();

var db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
db.connect(function (error) {
  return error ? console.log("error", error) : console.log("connected to the handofhope db");
});
module.exports = db;