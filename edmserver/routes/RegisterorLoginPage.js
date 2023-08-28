var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('LoginorRegister', {title: "The Cloverpatch"})
})

module.exports = router;