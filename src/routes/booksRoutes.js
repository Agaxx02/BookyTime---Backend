var express = require('express');
var router = express.Router();
const booksController = require('../controllers/booksController');

router.get('/getBooks', booksController.getBooks);
router.post('/addBooks', booksController.addBooks);
router.put('/deleteBooks', booksController.deleteBooks);

module.exports = router;
