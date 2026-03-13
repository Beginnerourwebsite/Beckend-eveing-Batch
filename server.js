//express(server create,route,mildderware)

// import Fun from "./MyLogic";//in React 

//import my Package
let express = require("express");
let app = express();
app.use(express.json()); //permission/json












// let Fun = require("./MyLogic");//import if u wanna import all Method/ver etc 
// from one file then use this method
let {Fun,arr} = require("./MyLogic");////import if u wanna import spec. Method/ver etc 
// from one file then use this method
// Fun("", "");
console.log(arr)
console.log(Fun())







//create server and assign Port
app.listen(8000, function () {
  console.log("My Server Is Running ", 8000);
});

//Api (as Route)
// app.get("/Pankaj", function (req, res) {
// //   res.send("this is My Default Api. Welcome In Pankaj World.");
//   res.send("<h1>this is Testing</h1>");
//   res.end()//good Practice
// });
// app.post("/", function (req, res) {
// //   res.send("this is My Default Api. Welcome In Pankaj World.");
//   res.send("<h1>this is Testing</h1>");
//   res.end()//good Practice
// });

app.post("/DataProcess", function (req, res) {
  //   console.log(req.body);
  let UserData = req.body;
  let msg = "Hello " + UserData.Name + ", How are you? Suresh this side.";
  if (UserData.Name == "Rajesh") {
    msg = "Haa Ji " + UserData.Name + ", Kse Ho? PheChana Suresh Bol Rha hu";
  }
  res.send(msg);
  res.end();
});
//path,function
// app.get("/sendWebsite", <Function />);

//loop/obj/array/condition (70% is compalete + import export (10%))(20% is new)

//Api
{
  /* <Route path='/'	elemant> */
}

// customr=>order=>watter=>cook
// User=>Req=>server=>function/local with Route (Request) //req come from frontend
// User<=Res<=server<=function/local with Route (Response)//Send By Server

//req come from frontend

// java script (inspect)(watch/Check)

//Api Method 4
//Get
//Post (Insert) (frontend Koi Req. lani ho us k
//  behalf koi task ya data process krna ho then us Process ka reposne dena ho )
//Delete
//PUT (Update)

// get vs Post/Delete/Put (Api Method And Using Way are Same)
// get (Easy to use)//and Browser support Dirctly
//data

//Backend Secure
// without permision no one can send any data

//how to create functions in node js
// how to export and import function in node js
