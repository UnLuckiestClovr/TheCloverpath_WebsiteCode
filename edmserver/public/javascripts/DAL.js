var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.json({
        user: {
            "username": "GeneralUser",
            "password": "ThisisAGoodPassword",
        }
    })
})

module.exports = router