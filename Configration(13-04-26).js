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

//MongoDb Connection (MonogoDb Server connected)
let url = "mongodb://localhost:27017/";
let ClientDb = new Mongoclient(url);
// ClientDb.connect()
//   .then(function (client) {})
//   .catch(function (err) {});

async function ConnectingMongoDb() {
  try {
    let Connected = await ClientDb.connect();

    let db = Connected.db("RobotManaging");

    return db.collection("ProductList");
  } catch (err) {
    console.log(err);
  }
}
// ================Multer File Upload System start====================

let Storage = Multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "FrontEndFile/");
  },
  filename: function (req, file, cb) {
    let RandoneName = Math.random() * 99999999999;
    let Unique_Name = Math.floor(RandoneName);
    console.log(Unique_Name);
    cb(null, Unique_Name + "_" + file.originalname);
  },
});

let UploadSystem = Multer({ storage: Storage });

// ================Multer File Upload System End====================

App.get("/getProduct", async (req, res, next) => {
  let MyDb = await ConnectingMongoDb();
  // let products = await MyDb.find().toArray();
  // let products = await MyDb.find({ Name: "Pankaj",Price:1000 }).sort({ Price: 1 }).toArray();
  let products = await MyDb.findOne({ Name: "Pankaj" });
  // let products = await MyDb.find().select("Name Price").toArray();

  // select top 2 from db.tablename where limit 2
  // select name,class,phone from db.tablename where price > 500
  res.json(products);
});
App.delete("/getProduct", async (req, res, next) => {
  let MyDb = await ConnectingMongoDb();

  // let products = await MyDb.deleteOne({ Name: "mukesh" });
  let products = await MyDb.deleteMany({ Name: "mukesh" });

  res.json(products);
});

App.post(
  "/insertProduct",
  UploadSystem.single("image"),
  async (req, res, next) => {
    console.log(req.file);
    console.log(req.body);

    let MyDb = await ConnectingMongoDb();
    let inserted = await MyDb.insertOne({
      ...req.body,
      ImageUrl: req.file.path,
    });
    res.json(inserted);
  },
);
App.post("/insertProductMulty", async (req, res, next) => {
  let myDb = await ConnectingMongoDb();
  let inserted = await myDb.insertMany([
    { Name: "Suger", Price: 50, Qty: "50Kg", ImageUrl: "" },
    { Name: "Salt", Price: 20, Qty: "50Kg", ImageUrl: "" },
    { Name: "Rice", Price: 80, Qty: "50Kg", ImageUrl: "" },
    { Name: "Wheat", Price: 100, Qty: "50Kg", ImageUrl: "" },
    { Name: "Oil", Price: 150, Qty: "50Kg", ImageUrl: "" },
    { Name: "Dal", Price: 120, Qty: "50Kg", ImageUrl: "" },
  ]);
  res.json(inserted);
});

module.exports = { Connection, App, Multer };
