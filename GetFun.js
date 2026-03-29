const { Connection } = require("./Configration");

let GetUserData = (req, res, next) => {
  Connection.query(
    "select * from Nodejsapis.eveningbatch order by id desc",
    function (err, result) {
      if (err) {
        console.log(err);
        res.end();
      } else {
        res.json(result);
      }
    },
  );
};

// function <fucntionName>() {}
// let  <fucntionName> = (req, res, next) =>  {}
// let  <fucntionName>= function (req, res, next) {}

module.exports = { GetUserData };
