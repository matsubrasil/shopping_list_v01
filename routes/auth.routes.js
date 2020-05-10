const express = require('express');
const router = express.Router();

const AuthController = require('./../controllers/auth.controller');
const authMiddleare = require('./../middleware/auth');

router.post('/', AuthController.login);
router.get('/user', authMiddleare, AuthController.user_info);

module.exports = router;
