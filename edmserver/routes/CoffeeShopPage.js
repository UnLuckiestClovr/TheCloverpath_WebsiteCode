var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('CoffeeShopPage', {title: "The Cloverpatch" , loggedInBool: (session.user !== null)})
})

module.exports = router;