const express = require('express');
const router = express.Router();

//las funciones de NodeJS tienen request(req) y response (res)
router.get('/', function(req, res){
    res.send('Home route');
});
module.exports = router;//como se exporta el router en el browser es NodeJS no JS
