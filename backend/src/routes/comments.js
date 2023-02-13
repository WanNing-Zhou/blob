const express = require("express");
const CommentController = require("../controller/comments");
const { authMiddleware } = require("../middleware/admin/auth.middleware");

const router = express.Router();

router.post("/:slug", authMiddleware, CommentController.creatComment);
router.get("/:slug", authMiddleware, CommentController.getComments);
router.delete("/:slug/:id", authMiddleware, CommentController.deleteComment);

module.exports = router;
