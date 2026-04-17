let bcrypt = require("bcrypt");
let password = "RadheShyam23";
let hashdetails =
  "$2b$04$j5Igs9.kDxUOM9KWuSCBHeUdJ28DuCV6Gy/0nG52iONQPh/XemN4u";
// bcrypt
//   .hash(password, 100000)//jitna big number hoga utna jyada time lagega hash banne me
//   .then(function (hash) {
//     console.log(hash);
//   })
//   .catch(function (err) {});

// if (hashdetails == password) {
//   console.log("Password Matched");
// } else {
//   console.log("Password Not Matched");
// }

bcrypt
  .compare(password, hashdetails)
  .then(function (isMatch) {
    console.log(isMatch);
  })
  .catch(function (err) {});

// 1234=>tdrfyguijo
// tdrfyguijo=>1234
// encrypt