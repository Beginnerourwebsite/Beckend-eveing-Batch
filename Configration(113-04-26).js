const express = require("express");
const App = express();
let cors = require("cors");
let mysql = require("mysql");
let MongoDb = require("mongodb");
let Mongoclient = MongoDb.MongoClient;
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
let obj = {
  user: "root",
  password: "1234",
  host: "localhost",
};
let Connection = mysql.createConnection(obj);
Connection.connect(function (err) {
  if (err) console.log(err);
  else console.log("Database Is Connected");
});
let Port = 8000;
App.listen(Port, function () {
  console.log("you port is " + Port);
});

//MongoDb Connection
let url = "mongodb://localhost:27017/";
let ClientDb = new Mongoclient(url);

App.get("/TestMongoDb", function (req, res) {
  ClientDb.connect()
    .then(function (client) {
      console.log("MongoDb Is Connected");
      let db = client.db("RobotManaging");
      db.collection("ProductList")
        .find({ Name: "mukesh" })
        .limit(2)
        .toArray()
        // .findOne({ Name: "Pankaj" })
        .then(function (data) {
          res.json(data);
        });
    })
    .catch(function (err) {
      console.log(err);
    });
});
// let a = 50;
// let b=[50,60,80,100]

App.post("/AddProduct", function (req, res) {
  let Datas = req.body;

  ClientDb.connect().then(function (client) {
    let db = client.db("RobotManaging");
    let collections = db.collection("ProductList");
    collections
      // .insertOne({ Name: "Pankaj", Price: 1000 })
      .insertMany(Datas)
      .then(function (data) {
        console.log(data);
        res.json(data);
      });
  });
});

console.log("ClientDb", ClientDb);

module.exports = { Connection, App, Multer };

//2 ways
//free way (1000)(google)
//paid way (unlimited) ()

// Sunday

// Multer
//password encription
