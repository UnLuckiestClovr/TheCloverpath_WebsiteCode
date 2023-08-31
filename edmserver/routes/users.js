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
      let username = loginData.username
      let userData = await User.u_GET(username)
      let fullname = userData.u_name
      let age = userData.u_age
      let email = userData.email
      req.session.user = { username, fullname, email, age }
      res.sendStatus(200)
    } else {
      res.sendStatus(500)
    }
  } catch (error) {
    console.log(error)
  }
})

router.post('/updateusername', async function(req, res, next) {
  try {
    const updateData = req.body
    const updateSuccess = await User.u_UPDATE(updateData)
    const userData = await User.u_GET(updateData.username)
    if(updateSuccess) {
      let username = userData.username
      let fullname = userData.u_name
      let age = userData.u_age
      let email = userData.email
      req.session.user = { username, fullname, email, age }
      res.sendStatus(200)
    } else {
      res.sendStatus(500)
    }
  } catch (error) {
    console.log(error)
  }
})

router.post('/updateemail', async function(req, res, next) {
  try {
    const updateData = req.body
    const updateSuccess = await User.u_UPDATE(updateData)
    const userData = await User.u_GET(updateData.username)
    if(updateSuccess) {
      let username = userData.username
      let fullname = userData.u_name
      let age = userData.u_age
      let email = userData.email
      req.session.user = { username, fullname, email, age }
      res.sendStatus(200)
    } else {
      res.sendStatus(500)
    }
  } catch (error) {
    console.log(error)
  }
})

router.post('/updateu_name', async function(req, res, next) {
  try {
    const updateData = req.body
    const updateSuccess = await User.u_UPDATE(updateData)
    const userData = await User.u_GET(updateData.username)
    if(updateSuccess) {
      let username = userData.username
      let fullname = userData.u_name
      let age = userData.u_age
      let email = userData.email
      req.session.user = { username, fullname, email, age }
      res.sendStatus(200)
    } else {
      res.sendStatus(500)
    }
  } catch (error) {
    console.log(error)
  }
})

router.post('/updateu_age', async function(req, res, next) {
  try {
    const updateData = req.body
    const updateSuccess = await User.u_UPDATE(updateData)
    const userData = await User.u_GET(updateData.username)
    if(updateSuccess) {
      let username = userData.username
      let fullname = userData.u_name
      let age = userData.u_age
      let email = userData.email
      req.session.user = { username, fullname, email, age }
      res.sendStatus(200)
    } else {
      res.sendStatus(500)
    }
  } catch (error) {
    console.log(error)
  }
})

module.exports = router; 
