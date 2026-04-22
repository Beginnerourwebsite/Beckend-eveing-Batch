let { App, Mongoose } = require("./Configration(18-04-26)");
let url = "mongodb://localhost:27017/RobotManaging";
Mongoose.connect(url)
  .then(function (db) {
    console.log("Connected Success Fully");
  })
  .catch((err) => {
    console.log(err);
  });

let MySchema = new Mongoose.Schema({
  Name: {
    type: String,
    enum: ["Coffee", "Tea"],
  },
  Phone: Number,
  Email: String,
  Password: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: [20, "Must be at most 20 characters"],
  },
});


let UserDatas = Mongoose.model("owncol", MySchema);

App.post("/insertData", async (req, res, next) => {
  let result = await UserDatas.create(req.body);
  res.json(result);
});

App.get("/getData", async (req, res, next) => {
    let result = await UserDatas.find();
  // let result = await UserDatas.findOne({ Name: "OmPati123" });

  res.json(result);
});
App.delete("/getData", async (req, res, next) => {
  let data = req.params;
  //   let result = await UserDatas.find({ Name: "OmPati123" });
  //   let result = await UserDatas.deleteOne({ Name: "OmPati123" });
  let result = await UserDatas.deleteMany({ data });

  res.json(result);
});

App.put("/UpdateDatas/:id", async function (req, res) {
  // let itemId = req.params.id;
  let UpdateDetails = req.body;
  let itemId = UpdateDetails.id;
  
  let result = await UserDatas.findByIdAndUpdate(
    // { _id: itemId },
      itemId,
    { $set: UpdateDetails },
  );
  res.json(result);
});
// update <table> set Name='Pankaj' where Name='OmPati'
// let obj = {
//   Name: "Pankaj",
//   Name: "om prakash",
// };
// console.log(obj);
