const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "118.25.137.167",
  user: "root",
  password: "YZL121380",
  database: "blog",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database: ", err);
    return;
  }
  console.log("Connected to MySQL database");
});

connection.query("SELECT * FROM article_group", (err, results) => {
  if (err) {
    console.error("Error executing query: ", err);
    return;
  }
  console.log("Query results: ", results);
});

connection.end((err) => {
  if (err) {
    console.error("Error closing database connection: ", err);
    return;
  }
  console.log("Database connection closed");
});
// 登录？

// 查group,再查对应的artical

// markdown显示和编辑组件
