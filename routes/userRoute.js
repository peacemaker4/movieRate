const express = require('express')
const path = require('path');
const userController = require('../controllers/userController')
const router = express.Router();
router.get('/', userController.findAll);
router.get('/:id', userController.findOne);
router.get('/:id/edit', userController.findOneEdit);
router.post('/find/', userController.findByUsername);
router.post('/', userController.create);
router.post('/authorize', userController.login);
router.patch('/:id', userController.update);
router.delete('/:id', userController.destroy);
router.get('/auth/google', userController.authGoogle);
router.get('/profile/me', userController.userProfile);

module.exports = router