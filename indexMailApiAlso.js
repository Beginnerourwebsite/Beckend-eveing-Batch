let { App, Connection } = require("./Configration");
const { GetUserData } = require("./GetFun");

App.get("/GetUser", GetUserData);

App.post("/userReg", (req, res, next) => {
  let Data = req.body;
  console.log(Data);
  Connection.query(
    "INSERT INTO Nodejsapis.eveningbatch  set ?",
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

App.put("/UpdateUserNameorMail", (req, res, next) => {
  debugger;
  let UserData = req.body;
  console.log(UserData);

  Connection.query(
    "update  Nodejsapis.eveningbatch set email=?, name=?  where id=?",
    [UserData.email, UserData.name, UserData.id],
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
App.delete("/DeleteUser", function (req, res) {
  debugger;
  let UserId = req.body;
  console.log(UserId);

  Connection.query(
    "delete from Nodejsapis.eveningbatch where id=?",
    [UserId.id],
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

//mail api









//BO

//forget password
// encript
// forget password time OTP Send
// password auto gernated and show on  mail

// mail send

//templates
//otp
// adv.
