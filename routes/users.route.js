const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt")
const User = require("../models/User.model")

router.route('/signup')
  .get((req, res) => {
    res.render('signup-form');
  })
  .post(async (req, res) => {
    const { username, email, password } = req.body
    try {
      if ( !username || !password || !email || !email.includes('@')) throw Error({ type: "CRED_ERR", msg: "Missing credentials" })

      const user = await User.findOne({ email })
      if (user) throw Error({ type: "USR_ERR", msg: "Email exists" })

      const salt = bcrypt.genSaltSync(5)
      const hashPwd = bcrypt.hashSync(password, salt)

      const newUser = await User.create({ username, email, password: hashPwd })
      res.send(newUser)
    }
    catch (error) {
      res.render("signup-form", { username, email, error })
    }

  })

router.route("/login")
  .get((req, res) => { res.render("login-form") })
  .post(async (req, res) => {
    const { email, password } = req.body
    try {
      if (!email || !password) throw Error({ type: "CRED_ERR", msg: "Missing credentials" })

      const loggedinUser = await User.findOne({ email })
      if (!loggedinUser) throw Error({ type: "USER_ERR", msg: "User does not exist" })

      const pswIsCorrect = bcrypt.compareSync(password, loggedinUser.password)
      if (!pswIsCorrect) throw Error({ type: "PWD_ERR", msg: "Password incorrect" })

      req.session.loggedinUser = loggedinUser
      res.redirect("/")
    } catch (error) {
      res.render("login-form", { email, error })
    }
  })

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) res.redirect('/');
    else res.redirect('/users/login');
  });
});


module.exports = router;
