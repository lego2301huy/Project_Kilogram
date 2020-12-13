const express = require('express')
// const router = express.Router()
const router = require('express-promise-router')()

const FollowController = require('../controllers/follow')

const { validateBody, validateParam, ValidateQuery, schemas } = require('../helpers/routerHelpers')

router.route('/followers')
    .get(FollowController.getFollower)
    .post(validateBody(schemas.FollowerSchema), FollowController.newFollower)
    .delete(FollowController.deleteFollwer)

router.route('/following')
    .get(FollowController.getFollowing)
    .post(FollowController.newFollwing)
    .delete(FollowController.deleteFollwing)