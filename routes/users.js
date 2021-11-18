var express = require('express');
var router = express.Router();

/* GET users listing. */
router.route('/signup')
.get((req, res) => {
  res.render('signup-form');
})
.post((req, res)=>{
const {username, email, password} = req.body
res.send(req.body)
})

module.exports = router;
