// ─────────────────────────────────────────────────────────────
//  express for server, route, middleware...
//  mysql for database connection
//  cors for allowing frontend to call this API
// ─────────────────────────────────────────────────────────────

let express = require("express");
let cors    = require("cors");
let mysql   = require("mysql");

let server = express();

server.use(cors());           // allow frontend (React/HTML) to call this API
server.use(express.json());   // middleware → reads JSON body from frontend requests

let port = 8000;

server.listen(port, function () {
  console.log("Server is running on port: " + port);
});

// ─────────────────────────────────────────────────────────────
//  Connect Database (MySQL)
// ─────────────────────────────────────────────────────────────

let Connection = mysql.createConnection({
  host     : "localhost",
  user     : "root",
  password : "1234",
  database : "eveningclass",   // set default DB here so you don't repeat it in every query
});

Connection.connect(function (err) {
  if (err) console.log("DB Error: ", err);
  else     console.log("Connected to MySQL Successfully ✅");
});

// ─────────────────────────────────────────────────────────────
//  MIDDLEWARE  →  Validate that 'name' and 'email' exist in body
//  This runs ONLY on POST and PUT routes (not on GET/DELETE)
//  next() means "ok, go ahead to the actual route"
// ─────────────────────────────────────────────────────────────

function validateStudent(req, res, next) {
  let { name, email } = req.body;

  if (!name || !email) {
    // stop here, don't go to the route
    return res.json({ error: "Name and Email are required!" });
  }

  // simple email format check
  if (!email.includes("@")) {
    return res.json({ error: "Email is not valid!" });
  }

  next(); // everything is fine → go to the route
}

// ─────────────────────────────────────────────────────────────
//  READ ALL  →  GET /
//  Frontend calls this to show all students in a table
// ─────────────────────────────────────────────────────────────

server.get("/", function (req, res) {
  let sql = "SELECT * FROM studentdetails";

  Connection.query(sql, function (err, result) {
    if (err) console.log(err);
    else     res.json(result);   // sends array of all students to frontend
  });
});

// ─────────────────────────────────────────────────────────────
//  READ ONE  →  GET /student/:id
//  Frontend sends an id in the URL  →  /student/3
//  Returns just that one student
// ─────────────────────────────────────────────────────────────

server.get("/student/:id", function (req, res) {
  let id  = req.params.id;           // get id from URL
  let sql = "SELECT * FROM studentdetails WHERE id = ?";

  Connection.query(sql, [id], function (err, result) {
    if (err) console.log(err);
    else if (result.length === 0) res.json({ message: "Student not found" });
    else res.json(result[0]);         // send the single student object
  });
});

// ─────────────────────────────────────────────────────────────
//  INSERT / CREATE  →  POST /student
//  Frontend sends:  { name: "Ali", email: "ali@gmail.com", age: 22 }
//  validateStudent middleware runs FIRST to check name & email
// ─────────────────────────────────────────────────────────────

server.post("/student", validateStudent, function (req, res) {
  let { name, email, age } = req.body;  // get data sent from frontend form

  let sql    = "INSERT INTO studentdetails (name, email, age) VALUES (?, ?, ?)";
  let values = [name, email, age];

  Connection.query(sql, values, function (err, result) {
    if (err) console.log(err);
    else     res.json({ message: "Student Added Successfully ✅", id: result.insertId });
  });
});

// ─────────────────────────────────────────────────────────────
//  UPDATE  →  PUT /student/:id
//  Frontend sends id in URL + new data in body
//  Example:  PUT /student/3  with body { name: "Ali Updated", email: "new@gmail.com", age: 23 }
//  validateStudent middleware runs FIRST to check name & email
// ─────────────────────────────────────────────────────────────

server.put("/student/:id", validateStudent, function (req, res) {
  let id             = req.params.id;
  let { name, email, age } = req.body;

  let sql    = "UPDATE studentdetails SET name = ?, email = ?, age = ? WHERE id = ?";
  let values = [name, email, age, id];

  Connection.query(sql, values, function (err, result) {
    if (err) console.log(err);
    else if (result.affectedRows === 0) res.json({ message: "Student not found" });
    else res.json({ message: "Student Updated Successfully ✅" });
  });
});

// ─────────────────────────────────────────────────────────────
//  DELETE  →  DELETE /student/:id
//  Frontend sends id in URL
//  Example:  DELETE /student/3
// ─────────────────────────────────────────────────────────────

server.delete("/student/:id", function (req, res) {
  let id  = req.params.id;
  let sql = "DELETE FROM studentdetails WHERE id = ?";

  Connection.query(sql, [id], function (err, result) {
    if (err) console.log(err);
    else if (result.affectedRows === 0) res.json({ message: "Student not found" });
    else res.json({ message: "Student Deleted Successfully ✅" });
  });
});

// ─────────────────────────────────────────────────────────────
//  SUMMARY OF ALL ROUTES
//
//  GET    /               → get ALL students
//  GET    /student/:id    → get ONE student by id
//  POST   /student        → ADD a new student  (needs name, email in body)
//  PUT    /student/:id    → UPDATE a student   (needs name, email in body)
//  DELETE /student/:id    → DELETE a student
//
//  Middleware: validateStudent → checks name & email before POST and PUT
// ─────────────────────────────────────────────────────────────