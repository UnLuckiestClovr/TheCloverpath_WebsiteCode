var express = require('express');
var router = express.Router();

router.get('/', function() {
    res.render('CoffeeShopPage', {title: "The Cloverpatch"})
})

module.exports = router;