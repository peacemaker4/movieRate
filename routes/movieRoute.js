const express = require('express')
const path = require('path');
const movieController = require('../controllers/movieController')
const userController = require("../controllers/userController");
const router = express.Router();
router.post('/', movieController.create);
router.get('/', movieController.findAll);
router.get('/:id', movieController.findOne);
router.get('/:id/edit', movieController.findOneEdit);
router.post('/find/', movieController.findByTitle);
router.patch('/:id', movieController.update);
router.delete('/:id', movieController.destroy);
module.exports = router