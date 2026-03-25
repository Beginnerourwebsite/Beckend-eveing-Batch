const express = require("express");
const app = express();
let cors = require("cors");
let mysql = require("mysql");

app.use(express.json());
app.use(cors());
let connection = mysql.createConnection({
  host: "localhost",
  password: "1234",
  user: "root",
});

connection.connect(function (err) {
  if (err) console.log(err);
  else console.log("database connected successfully");
});

app.get("/:Name/:Id", (req, res, next) => {
  let { Name, Id } = req.params;

  connection.query(
    "select * from nodejsapis.eveningbatch where id=?",
    [Id],
    function (err, result) {
      if (err) console.log(err);
      else {
        console.log(result);
        res.json({
          response: "Get Successfully",
          RecordCount: result.length,
          result,
        });
      }
    },
  );
  //   let data = req.params;
  //   data.Name;
  //   data.id;

  console.log(Name, Id);
});

app.put("/updateData", function (req, res) {
  connection.query(
    "update Nodejsapis.eveningbatch set Name=? where id=?",
    function (err, result) {
      if (err) console.log(err);
      else {
        res.json({
          ResponseMessage: "Update Successfully",
          result,
        });
      }
    },
  );
});


app.put("/updateDataDyn", function (req, res) {
  let { Updatedvalue, condition } = req.body;
  //image,file,url

  connection.query(
    "update Nodejsapis.eveningbatch set ? where ?",
    [Updatedvalue, condition],
    function (err, result) {
      if (err) console.log(err);
      else {
        res.json({
          ResponseMessage: "Update Successfully",
          result,
        });
      }
    },
  );
});

app.delete("/updateDataDyn", function (req, res) {
  let { Updatedvalue, condition } = req.body;

  connection.query(
    "update Nodejsapis.eveningbatch set ? where ?",
    [Updatedvalue, condition],
    function (err, result) {
      if (err) console.log(err);
      else {
        res.json({
          ResponseMessage: "Update Successfully",
          result,
        });
      }
    },
  );
});
let port = 8000;
app.listen(port, () => {
  console.info(`Server listen on port ${port}`);
});




// how to use these api in frontend