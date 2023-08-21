var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('FlowerShopPage', {title: "The Cloverpatch"})
})

var buttons = document.querySelectorAll('orderButton')
buttons.forEach(function(button) {
    button.addEventListener('click', OrderFlowers)
})

const OrderFlowers = async (FlowerSpecies) => {
    console.log("Clicked Order on: ", FlowerSpecies)

    orderOverlayOn()
}

const orderOverlayOn = () => {
    document.getElementById("").style.display = "block";
}

const orderOverlayOff = () => {
    document.getElementById("").style.display = "none";
}

export{ OrderFlowers, orderOverlayOff }

module.exports = router;