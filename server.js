//express for server,route,middel wasr...............
//(but every data class)
//tusday (no Class)
let express = require("express");
let cors = require("cors");
let mysql = require("mysql");
const { get } = require("http");
let server = express();

server.use(cors()); //allow run api in frontend
server.use(express.json()); //it allow to get data from frontend as json format//midelware

let port = 8000;

server.listen(port, function () {
  console.log("server is running your port is: " + port);
});

//connect database (MySql)
let Connections = mysql.createConnection({
  user: "root",
  password: "1234",
  host: "localhost",
});
Connections.connect(function (err) {
  if (err) console.log(err);
  else console.log("Connected Successfully");
}); //optional

// frontend
// => form =>reg=>username,email

server.get("/", function (req, res) {
  Connections.query(
    "SELECT * FROM eveningclass.studentdetails;",
    function (err, result) {
      if (err) console.log(err);
      else res.json(result);
    },
  );
});
// update
// delete
// get
// insert

// static

// dynmic

// backend
// front =>req rec.
// =>middle ware (Email)//it will check that mail is vaild or not (when we use a middelware it run erevrevery time)
//=> Api=>datasave

4;
// get
// delete update insert
