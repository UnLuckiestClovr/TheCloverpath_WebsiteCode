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

    res.json({message: 'User Registration Successful'})
  } catch (error) {
    res.sendStatus(500)
  }
})

router.post('/login', async function(req, res, next) {
  
  try {
    const loginData = req.body
    await User.u_Login(loginData)
    req.session.user = req.body

    res.json({message: 'User Login Successful'})
  } catch (error) {
    console.log(error)
  }
})

module.exports = router; 
