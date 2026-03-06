let express = require("express"); //import
let app = express(); //use

//server
app.listen(8000);
//http://localhost:8000=server

//Api
app.get("/findata", function (req, res) {
	console.log("this is my Api")
//  res.send("this is my api")
 res.send({
  "id": 1,
  "title": "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  "price": 109.95,
  "description": "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  "category": "men's clothing",
  "image": "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
  "rating": {
    "rate": 3.9,
    "count": 120
  }
})
});

//this time server is running

//http://localhost:5173/
//5173=port
//localhost=servername
// servname+port=server Url

// import Express from 'express'

//Api
//server
//logic
//databse Comunication
//Sercurity
//Website

//Framework (Express)
//server (2 Method)
// 1) using built in function (CreateServer()) (mannualy)
//  (Large Line of Codes) (u will have to write any thing manualy in same page/file)

// 2) using thrid party package/lib
//line of code less as compare built in funtions
//code fast
//clean code

//server/api/midderware/cors etc





//server ko req kse multi ha 
// api (example)