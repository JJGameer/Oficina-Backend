const mysql = require("mysql2");
require("dotenv").config();

//configurar conexão com bd
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("Erro a conectar à base de dados:", err);
  } else {
    console.log("Conexão feita à base de dados");
    connection.release();
  }
});

module.exports = db;
