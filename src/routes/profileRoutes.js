var express = require('express');
var router = express.Router();
const profileController = require('../controllers/profileController');

router.post('/updateProfile', profileController.updateProfile);

module.exports = router;
