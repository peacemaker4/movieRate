const express = require('express')
const path = require('path');
const movieController = require('../controllers/movieApiController')
const router = express.Router();
router.post('/add/', movieController.create);
router.get('/', movieController.findAll);
router.get('/:id', movieController.findOne);
router.post('/find/', movieController.findByTitle);
router.patch('/:id/update/', movieController.update);
router.delete('/:id/delete/', movieController.destroy);
module.exports = router