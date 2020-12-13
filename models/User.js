const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
  avatar: {
    type: String
  },
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  userName: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  decks: [{
    type: Schema.Types.ObjectId,
    ref: 'Deck'
  }],
  posts: [{
    type: Schema.Types.ObjectId,
    ref: 'Post'
  }]
})

UserSchema.methods.isValidPassword = async function(newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.password)
  } catch (error) {
    throw new Error(error)
  }
}

UserSchema.pre('save', async function (next) {
  try {
    //Generate a salt
    // console.log('password :', this.password)
    const salt = await bcrypt.genSalt(10)
    // console.log('salt ', salt)

    //Generate a password hash
    const hashedPassword = await bcrypt.hash(this.password, salt)
    // console.log('password hashed: ', hashedPassword)
    //Re-assign password hashed
    this.password = hashedPassword
  } catch (error) {
    next(error)
  }
})

const User = mongoose.model('User', UserSchema)
module.exports = User