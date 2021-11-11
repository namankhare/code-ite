const express = require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid');
var mySql = require('mysql2');

//sql connection
var pool = mySql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'code-ite',
  multipleStatements: true
});

pool.getConnection((err, conn) => {
  if (err) {
    console.log('connection error', err);
  }
  else {
    console.log('connected to db');
  }
})


router.get("/", (req, res) => {
  res.render('home')
});

router.get("/croom", (req, res) => {
  res.redirect(`/croom/${uuidv4()}`);
});

router.get("/croom/:join", (req, res) => {
  res.render("room", { roomId: req.params.join });
});

router.post("/login", (req, res) => {
  pool.getConnection((err, conn) => {
    if (err) {
      console.log(err);
      res.json({ error: err });
    }
    else {
      console.log(req.body);
      const email = req.body.email
      const password = req.body.password

      var sql = "SELECT name FROM users WHERE Email ='" + email + "'  AND Password = '" + password + "'";
      conn.query(sql, (err, dataa) => {
        if (err) {
          console.log(err);
          res.json({ error: err });
        }
        else {
          res.json({ data: dataa, msg: 'success' });
        }
      });
    }
  })
});



module.exports = router;

