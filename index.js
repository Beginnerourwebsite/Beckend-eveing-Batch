let express = require("express");
let app = express();
let cors = require("cors");
let { StudentDatas, InsertData } = require("./Model");
//create server
// console.log(StudentDatas)
app.use(express.json());
app.use(cors())//All Plateform can use my Apis



let Port = 8001;
app.listen(Port, function () {
  console.log("Server is running on", Port);
});

app.get("/StudentData", StudentDatas);
app.post("/AddStudent", InsertData);
