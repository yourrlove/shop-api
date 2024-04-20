'use strict';

const express = require('express');
const router = express.Router();
const accessContoller = require('../../controllers/access.controller');

//signUp
router.post('/signup', accessContoller.signUp);

module.exports = router;