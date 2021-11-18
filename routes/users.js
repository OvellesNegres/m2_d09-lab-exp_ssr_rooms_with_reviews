const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt")
const User = require("../models/User.model")


/* GET users listing. */
router.route('/signup')
.get((req, res) => {
  res.render('signup-form');
})
.post( async (req, res)=>{
const {username, email, password} = req.body
if(!username || !email || !password){
  res.render("signup-form", { username, email, error:{type: "CRED_ERR", msg: "Missing credentials"}})
}

const user = await User.findOne({email})
if(user){
  res.render("signup-form", { username, email, error:{type: "USR_ERR", msg: "Email exists"}})
}

const salt = bcrypt.genSaltSync(5)
const hashPwd = bcrypt.hashSync(password, salt)

const newUser = await User.create({username, email, password: hashPwd})
res.send(newUser)



})

module.exports = router;
