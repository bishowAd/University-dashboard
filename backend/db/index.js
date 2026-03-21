require("dotenv").config();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "newpassword123",
  database: "university_dashboard",
  waitForConnections: true,
  connectionLimit: 10,
});

pool
  .getConnection()
  .then(() => console.log("MySQL connected successfully"))
  .catch((err) => console.error("MySQL connection error:", err.message));

module.exports = pool;
