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

router.post('/', function(req, res, next) {
  try {
    let user = req.body
    User.u_CREATE(user)

    res.sendStatus(200)
  } catch (error) {
    res.sendStatus(500)
  }
})

module.exports = router; 
