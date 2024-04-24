'use strict';
const express = require('express');
const router = express.Router();
const { asyncHandler } = require('../../helpers/index');
const TagController = require('../../controllers/tag.controller');

router.get('/', asyncHandler( TagController.getAllTags ));
router.post('/', asyncHandler( TagController.createTag ));
router.put('/:id', asyncHandler( TagController.updateTag ));
router.delete('/:id', asyncHandler( TagController.deleteTag ));

module.exports = router;