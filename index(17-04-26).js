const { App } = require("./Configration(18-04-26)");
let becrypt = require("bcrypt");
let { ConnectingMongoDb } = require("./Configration(18-04-26)");

///midel ware kya hote ha

App.use(function (req, res, next) {
  if (req.body.Email) {
    let Email = req.body.Email;
    let EmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    console.log(EmailRegex.test(Email));
    if (EmailRegex.test(Email)) {
      next();
    } else {
      res.json({ message: "Invalid Email" });
    }
  }
}); // app.use() ka use midel ware ke liye hota ha

App.post("/AddUser", async (req, res) => {
  let UserDetails = req.body;

  if (UserDetails.password) {
    let Hashpassword = await becrypt.hash(UserDetails.password, 10);
    UserDetails.password = Hashpassword;
  }
  let MyDb = await ConnectingMongoDb();
  let result = await MyDb.insertOne(UserDetails);
  res.json(result);
});

App.post("/LoginUser", async (req, res) => {
  let MyDb = await ConnectingMongoDb();
  let result = await MyDb.findOne({ email: "pankaj@gmail.com" });
  console.log(result);

  let ismatch = await becrypt.compare(req.body.password, result.password);
  //   console.log(ismatch);
  if (ismatch && result.Name == req.body.Name) {
    res.json({ message: "Login Successfull" });
  } else {
    res.json({ message: "Login Failed" });
  }
});

// App

// let res = await fetch("http://localhost:8000/SendMail");
// let data = await res.json();
// console.log(data);

// mongoose vs MongoDb
// mongoose ek library ha jo MongoDb ke sath use hoti ha aur MongoDb ek database ha

//schema,pattern,model,collection,
let UserDetails = {
  Name: "Pankaj",
  Email: "pankaj@gmail.com",
  password: "123456",
};
//well formatted code
//secure code


