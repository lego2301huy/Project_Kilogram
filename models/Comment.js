const { string } = require('@hapi/joi')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentsSchema = new Schema({
    postWasCommented: {
      type: Schema.Types.ObjectId,
      ref: 'Post',
      unique: true
    },
    commented: {
      type: String
    },
    userCommented: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      unique: true,
    },
    time: {
      type: Date
    }
})

const Deck = mongoose.model('Deck', DeckSchema)
module.exports = Deck