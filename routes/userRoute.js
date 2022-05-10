const express = require('express')
const path = require('path');
const userController = require('../controllers/userController')
const router = express.Router();
router.get('/', userController.findAll);
router.get('/:id', userController.findOne);
router.get('/:id/edit', userController.findOneEdit);
router.post('/find/', userController.findByUsername);
router.post('/', userController.create);
router.patch('/:id', userController.update);
router.delete('/:id', userController.destroy);
module.exports = router