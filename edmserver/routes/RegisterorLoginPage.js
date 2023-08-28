var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('RegisterorLoginPage', {title: "The Cloverpatch"})
})

module.exports = router;