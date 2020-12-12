const express = require('express')
// const router = express.Router()
const router = require('express-promise-router')()

const UserController = require('../controllers/user')

const { validateBody, validateParam, ValidateQuery, schemas } = require('../helpers/routerHelpers')

const passport = require('passport')
const passportConfig = require('../middlewares/passport')

router.route('/')
    .get(UserController.index)
    .post(validateBody(schemas.userSchema), UserController.newUser)

router.route('/signup').post(validateBody(schemas.authSignUpSchema), UserController.signUp)

router.route('/signin').post(validateBody(schemas.authSignInSchema), passport.authenticate('local', {session: false}), UserController.signIn)

router.route('/secret').get(passport.authenticate('jwt', { session: false}), UserController.secret)

router.route('/search').get(validateBody(schemas.searchSchema), ValidateQuery(schemas.searchQuerySchema, 'page'), UserController.searchUsers)

router.route('/:userID')
    .get(validateParam(schemas.idSchema, 'userID'), UserController.getUser)
    .put(validateParam(schemas.idSchema, 'userID'), validateBody(schemas.userSchema), UserController.replaceUser)
    .patch(validateParam(schemas.idSchema, 'userID'), validateBody(schemas.userOptionalSchema), UserController.updateUser)

router.route('/:userID/decks')
    .get(validateParam(schemas.idSchema, 'userID'), UserController.getUserDecks)
    .post(validateParam(schemas.idSchema, 'userID'), validateBody(schemas.deckSchema), UserController.newUserDeck)

router.route('/:userID/posts')
.get(validateParam(schemas.idSchema, 'userID'), UserController.getUserPosts)
.post(validateParam(schemas.idSchema, 'userID'), validateBody(schemas.postSchema), UserController.newUserPost)

router.route('/:userID/:postID/likes')
    .get(validateParam(schemas.idSchema, 'userID'), validateParam(schemas.idSchema, 'postID'), UserController.getUserDecks)

router.route('./:userID/:postID/Comments')
    .get(validateParam(schemas.idSchema, 'userID'), validateParam(schemas.idSchema, 'postID'), UserController.getUserDecks)


module.exports = router