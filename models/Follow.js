const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FollowsSchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    total: {
        type: Number,
        default: 0
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    }
})

const Follows = mongoose.model('Deck', FollowsSchema)
module.exports = Follows