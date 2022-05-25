const express = require('express')
const path = require('path');
const reviewController = require('../controllers/reviewApiController')
const router = express.Router();
router.get('/', reviewController.findAll);
router.get('/movies/:movie_id', reviewController.findAllByMovieId);
router.get('/:id', reviewController.findOne);
router.post('/add/', reviewController.create);
router.post('/:id/delete/', reviewController.destroy);
module.exports = router