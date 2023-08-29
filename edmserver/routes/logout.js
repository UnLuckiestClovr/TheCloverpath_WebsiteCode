var express = require('express')
var router = express.Router()
var edm = require('../public/javascripts/edm')

router.post('/', (req, res) => {
    req.session.destroy((err) => {
        if (!err) {
            let session = req.session
            res.sendStatus(200)
        } else {
            res.sendStatus(500)
        }
    })
})

module.exports = router