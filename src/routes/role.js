'use strict';

const express = require('express');
const router = express.Router();
const RoleController = require('../controllers/role.controller');

router.post('/', RoleController.create_role);
router.delete('/', RoleController.delete_role);
router.get('/', RoleController.get_list_roles);

module.exports = router;