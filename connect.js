const mysql = require("mysql2");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "moshwar"
});

// الاتصال بقاعدة البيانات والتحقق من وجود أخطاء
db.connect((err) => {
  if (err) {
    console.error("Database Connection Failed :", err.message);
  } else {
    console.log("Database Connected Successfully");
  }
});

module.exports = db; 