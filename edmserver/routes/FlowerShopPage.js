var express = require('express');
var router = express.Router();

router.get('/', function() {
    res.render('FlowerShopPage', {title: "The Cloverpatch"})
})

module.exports = router;