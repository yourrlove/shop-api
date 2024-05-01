const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user.controller');
const { verifyToken } = require('../../middlewares/auth');
const { asyncHandler } = require('../../helpers/index');

router.get('/me', verifyToken, asyncHandler(userController.get_current_user));

module.exports = router;