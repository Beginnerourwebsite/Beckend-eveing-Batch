const express = require("express");
const App = express();
let cors = require("cors");
let mysql = require("mysql");
let nodemailer = require("nodemailer");

App.use(express.json());
App.use(cors());

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pankajdesktop23@gmail.com",
    pass: "gzhb qrzw avkk xdew",
    // "lvba gfmn rkic nqzv"
  },
});

let MyMailconfig = {
  from: "pankajdesktop23@gmail.com",
  to: "pankaj234goyal@gmail.com",
  subject: "this is mail from nodejs",
  text: "your otp is 1234",
};

App.get("/SendMail", (req, res) => {
  transporter.sendMail(MyMailconfig, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      console.log(info);
      res.json(info);
    }
  });
});

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

//2 ways
//free way (1000)(google)
//paid way (unlimited) ()
