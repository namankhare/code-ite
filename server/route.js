const express=require('express')
const router = express.Router()
const { v4: uuidv4 } = require('uuid');


router.get("/", (req, res) => {
  res.render('home')
});

router.get("/croom", (req, res) => {
  res.redirect(`/croom/${uuidv4()}`);
});
 
router.get("/croom/:join", (req, res) => {
  res.render("room", { roomId: req.params.join });
});

module.exports = router;

