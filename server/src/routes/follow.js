const express = require('express');
const  FollowController = require('../controller/follow');
const {authMiddleware} = require('../middleware/admin/auth.middleware')

const router = express.Router();

//关注
router.post('/:username',authMiddleware,FollowController.follow);
//取消关注
router.delete("/:username",authMiddleware,FollowController.cancelFollow);
//获取当前用户粉丝
router.get("/:username",authMiddleware,FollowController.getProfile)

module.exports = router
