const express = require("express");
const app = express();
let cors = require("cors");
let mysql = require("mysql");

app.use(express.json());
app.use(cors());

let connection = mysql.createConnection({
  user: "root",
  password: "1234",
  host: "localhost",
});
connection.connect(function (err) {
  if (err) console.log(err);
  else console.log("Database Is Connected");
});

//api
// update
// get
// insert
// delete

//get

app.get("/getUser", function (req, res) {
  connection.query(
    "select * from nodejsapis.eveningbatch ",
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
});

app.post("/regUser", function (req, res) {
  connection.query(
    "insert into nodejsapis.eveningbatch (id,name,email,password) value (1,'Suresh','Suresh@g,ail.com','asdfghjklzxcvbnm')",
    function (err, result) {
      if (err) {
        console.log(err);
        res.json(err);
      } else {
        console.log(result);
        res.json({
          response: "Insert Successfully",
          result,
        });
      }
    },
  );
});

app.post("/regUserDyn", function (req, res) {
  let Datas = req.body;
  console.log(Datas);
  connection.query(
    "insert into nodejsapis.eveningbatch (id,name,email,password) value (?,?,?,?)",
    [Datas.id, Datas.name, Datas.email, Datas.password],
    function (err, result) {
      if (err) {
        console.log(err);
        res.json(err);
      } else {
        console.log(result);
        res.json({
          response: "Insert Successfully",
          result,
        });
      }
    },
  );
});

app.post("/regUserDyn2", function (req, res) {
  let Datas = req.body;
  console.log(Datas);
  connection.query(
    "insert into nodejsapis.eveningbatch  set ?",
    [Datas],
    function (err, result) {
      if (err) {
        console.log(err);
        res.json(err);
      } else {
        console.log(result);
        connection.query(
          "select * from nodejsapis.eveningbatch",
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
        // res.json({
        //   response: "Insert Successfully",
        //   result,
        // });
      }
    },
  );
});

app.delete("/userDelete", function (req, res) {
  let datas = req.body;
  let sql = "delete from nodejsapis.eveningbatch where id=?";//null//data not deleted//actual data 1,2,6,58//it will be delete
  if (datas.id == null) {
    sql = "delete from nodejsapis.eveningbatch where id is null";
  }
  connection.query(sql, [datas.id], function (err, result) {
    if (err) {
      res.json(err);
    } else {
      res.json({
        response: "Delete Successfully",
        result,
      });
    }
  });
});



app.delete("/userDelete/:id", function (req, res) {
  let datas = req.params;//{id:"Values"}
  console.log(datas)
  let sql = "delete from nodejsapis.eveningbatch where id=?";
  if (datas.id == null) {
    sql = "delete from nodejsapis.eveningbatch where id is null";
  }
  connection.query(sql, [datas.id], function (err, result) {
    if (err) {
      res.json(err);
    } else {
      res.json({
        response: "Delete Successfully",
        result,
      });
    }
  });
});






let port = 8000;
app.listen(port, () => {
  console.info(`Server listen on port ${port}`);
});
