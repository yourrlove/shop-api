const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user.controller');
const { verifyToken } = require('../../middlewares/auth');

router.get('/me', verifyToken, userController.get_current_user);

module.exports = router;