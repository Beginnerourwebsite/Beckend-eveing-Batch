const express = require("express");
const App = express();
let cors = require("cors");
let mysql = require("mysql");

App.use(express.json());
App.use(cors());

let Connection = mysql.createConnection({
  user: "root",
  password: "1234",
  host: "localhost",
});
Connection.connect(function (err) {
  if (err) console.log(err);
  else console.log("Database Is Connected");
});
let Port = 8000;
App.listen(Port, function () {
  console.log("you port is " + Port);
});

module.exports = { Connection, App };
