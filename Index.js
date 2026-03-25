let { App, Connection } = require("./Configration");

App.get("/GetUser", (req, res, next) => {
	Connection.query("select * from Nodejsapis.eveningbatch order by id desc",function (err, result) {
      if (err) {
        console.log(err);
        res.end();
      } else {
        res.json(result);
      }
    },)
});
App.post("/userReg", (req, res, next) => {
	let Data = req.body;
	console.log(Data)
  Connection.query(
    "INSERT INTO Nodejsapis.eveningbatch set ?",
    [Data],
    function (err, result) {
      if (err) {
        console.log(err);
        res.end();
      } else {
        res.json(result);
      }
    },
  );
});

App.put("/UpdateUserNameorMail", (req, res, next) => {});
App.delete("/DeleteUser", function (req, res) {});
