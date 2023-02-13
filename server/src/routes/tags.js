const express = require('express');
const TagController = require('../controller/tags');
const { authMiddleware } = require('../middleware/admin/auth.middleware');

const router = express.Router();

router.post("/", authMiddleware, TagController.createTag);
router.get("/", authMiddleware, TagController.getTags);

module.exports = router;