var express = require('express');
const User = require('../models/user');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  try{
    let user = req.body
    User.u_GET(user)

    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(500)
  }
});

router.post('/register', function(req, res, next) {
  try {
    let user = req.body
    User.u_CREATE(user)

    res.json({message: 'User Registration Successful'})
  } catch (error) {
    res.sendStatus(500)
  }
})

router.post('/login', function(req, res, next) {
  try {
    const loginData = req.body
    User.u_Login(loginData)

    res.json({message: 'User Login Successful'})
  } catch (error) {
    console.log(error)
  }
  
})

module.exports = router; 
