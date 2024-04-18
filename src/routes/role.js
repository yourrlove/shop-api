'use strict';

const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../helpers/index');
const RoleController = require('../controllers/role.controller');

router.post('/', asyncHandler( RoleController.create_role ));
router.delete('/:id', asyncHandler( RoleController.delete_role ));
router.get('/', asyncHandler( RoleController.get_list_roles ));

module.exports = router;