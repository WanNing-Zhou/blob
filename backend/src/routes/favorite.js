const express = require('express');
const FavoriteController = require('../controller/favorite');
const { authMiddleware } = require('../middleware/admin/auth.middleware');

const router = express.Router();
// console.log(router, 'router');
// router.get('/:slug', FavoriteController.addFavorite);
router.post("/:slug", authMiddleware, FavoriteController.addFavorite);
router.delete("/:slug", authMiddleware, FavoriteController.removeFavorite);

module.exports = router;