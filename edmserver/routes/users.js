var express = require('express');
const User = require('../models/user');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  try{
    let user = req.session.user
    User.u_GET(user)

    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(500)
  }
});

router.post('/register', async function(req, res, next) {
  try {
    let user = req.body
    console.log(user)
    await User.u_CREATE(user)

    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(500)
  }
})

router.post('/login', async function(req, res, next) {
  try {
    const loginData = req.body
    const logSuccess = await User.u_Login(loginData)
    if(logSuccess) {
      console.log("Login Successful")
      let username = loginData.username
      let userData = await User.u_GET(username)
      console.log("User Data: ", userData)
      let fullname = userData.u_name
      let age = userData.u_age
      let email = userData.email
      req.session.user = { username, fullname, email, age }
      console.log(req.session.user)
      res.sendStatus(200)
    } else {
      res.sendStatus(500)
    }
  } catch (error) {
    console.log(error)
  }
})

module.exports = router; 
