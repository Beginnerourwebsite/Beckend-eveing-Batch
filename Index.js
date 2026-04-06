const { App, Multer } = require("./Configration");
//access Dist folder/storage
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

let UploadSystem = Multer({ storage: Storage },);

// login
// check Login Details

// Mail,password min=>8 length
//Mail,Password=>Backend=>Database k pass send kr deta tha (Mail,Password)
//select * from TableName where mail='' and password='' =>Data|| No Data(Null)/Empty
//vaild Mail,min 8 length Password

App.post("/FrontEndFiles", UploadSystem.single("Myfeild"), function (req, res) {
  console.log(req.body);
  console.log(req.file);
  res.json({ Message: "File Uploaded Successfully", FileDetails: req.file });
  //use as Middleware
  // use as Object system
  //   let obj = { Name: "pankaj.jpg", Size: 12345, Type: "image/jpeg" };
  //   obj.Size
});

//File type .jpg
//file size,
// storage

// pankaj Apis.js
// FrontEndCode.HTML

// A.png (05-04-26 07:09 PM)(Anand) (Get File Details)
//A.png (05-04-26 07:12 PM)(Pankaj) (old file us ko Overwrite Kr de ga)

// file save (ak random name generate kr dega) => A.png (05-04-26 07:09 PM)(Anand)hjadubweiud_A.png
// //pojjknwke_A.png
//few min i will start class



// how to send file from FrontEnd to Backend
//Middleware
//Bycript