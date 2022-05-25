const express = require('express')
const path = require('path');
const userController = require('../controllers/userApiController')
const router = express.Router();
router.get('/', userController.findAll);
router.get('/:id', userController.findOne);
router.post('/find/', userController.findByUsername);
router.post('/add/', userController.create);
router.patch('/:id/update/', userController.update);
router.delete('/:id/delete/', userController.destroy);
module.exports = router