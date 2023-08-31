var express = require('express');
var dal = require('../dal/Mongo_CRUD')
var router = express.Router();

const docArray = ['Question1', 'Question2', 'Question3']

router.get('/', function(req) {

})

router.get('/q1', async function(req, res, next) {
    try {
        const graphData = await dal.statGET('Question1')
        res.json({
            Ans1: graphData.Ans1,
            Ans2: graphData.Ans2,
            Ans3: graphData.Ans3,
            Ans4: graphData.Ans4
        })
    }
    catch (error) {console.log(error)}
})

router.get('/q2', async function(req, res, next) {
    try {
        const graphData = await dal.statGET('Question2')
        res.json({
            Ans1: graphData.Ans1,
            Ans2: graphData.Ans2,
            Ans3: graphData.Ans3,
            Ans4: graphData.Ans4,
            Ans5: graphData.ans5
        })
    }
    catch (error) {console.log(error)}
})

router.get('/q3', async function(req, res, next) {
    try {
        const graphData = await dal.statGET('Question3')
        res.json({
            Ans1: graphData.Ans1,
            Ans2: graphData.Ans2,
            Ans3: graphData.Ans3,
            Ans4: graphData.Ans4,
            Ans5: graphData.Ans5,
            Ans6: graphData.Ans6,
            Ans7: graphData.Ans7
        })
    }
    catch (error) {console.log(error)}
})

module.exports = router