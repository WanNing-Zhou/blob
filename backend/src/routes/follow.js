const express = require('express');
const  FollowController = require('../controller/follow');
const {authMiddleware} = require('../middleware/admin/auth.middleware')

const router = express.Router;

router.post('/:username',authMiddleware,FollowController.follow)
