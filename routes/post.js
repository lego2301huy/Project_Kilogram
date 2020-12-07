const express = require('express')
// const router = express.Router()
const router = require('express-promise-router')()

const PostController = require('../controllers/post')

const { validateBody, validateParam, schemas } = require('../helpers/routerHelpers')

router.route('/')
    .get(PostController.index)
    .post(validateBody(schemas.newPostSchema), PostController.newDeck)

router.route('/:postID')
    .get(validateParam(schemas.idSchema, 'postID'), DeckController.getDeck)
    .put(validateParam(schemas.idSchema, 'postID'), validateBody(schemas.newDeckSchema), DeckController.replaceDeck)
    .patch(validateParam(schemas.idSchema, 'postID'), validateBody(schemas.deckOptionalSchema), DeckController.updateDeck)
    .delete(validateParam(schemas.idSchema, 'postID'), DeckController.deleteDeck)

module.exports = router