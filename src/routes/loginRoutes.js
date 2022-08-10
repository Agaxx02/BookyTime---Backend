var express = require('express');
var router = express.Router();
const loginController = require('../controllers/loginController');

router.post('/loginUser', loginController.loginUser);

module.exports = router;
