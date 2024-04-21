'use strict';

const express = require('express');
const router = express.Router();
const AuthContoller = require('../controllers/auth.controller');
const { asyncHandler } = require('../helpers/index');
const { verifyToken } = require('../middlewares/auth');
/* GET home page. */
router.get('/', function(req, res, next) {
    req.cook
    res.render('index', { title: 'Express' });
  });
  
router.post('/signup', asyncHandler( AuthContoller.signUp ));
router.post('/login', asyncHandler( AuthContoller.logIn ));
router.get('/logout', verifyToken, asyncHandler( AuthContoller.logOut ));
router.get('/getaccesstoken', asyncHandler( AuthContoller.handleRefreshToken ));

module.exports = router;

