var express = require('express');
var router = express.Router();
const registerController = require('../controllers/registerController');

router.post('/registerUser', registerController.registerUser);

module.exports = router;
