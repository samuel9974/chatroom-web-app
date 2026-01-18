const mysql = require("mysql2");
const pool = mysql.createPool({
  host: "localhost",
  user: "chatuser", // MySQL username
  password: "123456", // MySQL password
  database: "chatroom_app",
});
module.exports = pool.promise();
