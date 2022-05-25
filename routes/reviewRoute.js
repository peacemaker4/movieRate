const express = require('express')
const path = require('path');
const reviewController = require('../controllers/reviewController')
const router = express.Router();
router.post('/', reviewController.create);
module.exports = router