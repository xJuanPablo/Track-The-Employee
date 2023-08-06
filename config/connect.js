require('dotenv').config();
const mysql = require('mysql2');

const dataBase = mysql.createConnection({
  host: 'localhost',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME, 
},
console.log(`Connected to the database`)
);

module.exports = dataBase;