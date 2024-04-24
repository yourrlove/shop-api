var express = require('express');
var router = express.Router();
const db = require('../../models');
const UserController = require('../../controllers/user.controller');
const { asyncHandler } = require('../../helpers/index');

/* GET users listing. */

router.put('/:id', asyncHandler( UserController.update_user ));
router.post('/', asyncHandler( UserController.create_user ));
router.get('/', asyncHandler( UserController.get_list_users ));
router.delete('/:id', asyncHandler( UserController.delete_user ));



module.exports = router;
