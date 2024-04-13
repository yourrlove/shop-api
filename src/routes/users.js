var express = require('express');
var router = express.Router();
const db = require('../models');
const UserController = require('../controllers/user.controller');

/* GET users listing. */

router.put('/:id', UserController.update_user)
router.post('/', UserController.create_user)
router.get('/', UserController.get_list_users)
router.delete('/:id', UserController.delete_user)

module.exports = router;
