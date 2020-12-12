const mongoose = require('mongoose')
const Schema = mongoose.Schema

const FollowsSchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
    follower: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    },
    following: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        unique: true
    }
})

const Follows = mongoose.model('Follow', FollowsSchema)
module.exports = Follows