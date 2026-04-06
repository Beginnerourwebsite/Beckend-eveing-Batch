const express = require("express");
const App = express();
let cors = require("cors");
let mysql = require("mysql");
let Multer = require("multer");
let nodemailer = require("nodemailer");
const InvoiceTemplate = require("./InvoiceTemplate");

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

App.post("/SendMail", (req, res) => {
  let UsreMailDetails = req.body;
  let randomNumber = Math.random(); // 0 to 0.95455165*50
  let myOtp = Math.floor(randomNumber * 99999);
  let MyMailconfig = {
    from: "pankajdesktop23@gmail.com",
    to: UsreMailDetails.to || "",
    subject: UsreMailDetails.subject || "",
    // text: UsreMailDetails.text || "",
    text: `Your OTP is: ${myOtp}`,
    // html:
    //   InvoiceTemplate(UsreMailDetails.customerName, UsreMailDetails.subtotal) ||
    //   "",
  };

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

module.exports = { Connection, App, Multer };

//2 ways
//free way (1000)(google)
//paid way (unlimited) ()

// Sunday

// Multer
//password encription
