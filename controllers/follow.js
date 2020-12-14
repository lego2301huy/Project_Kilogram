const User = require('../models/User')
const Follow = require('../models/Follow')

const getFollow = async (req, res, next) => {
  console.log("Calling follow function");
  const { userID } = req.value.params;
  // Get user
  const follow = await Follow.find({});
  // console.log("Get Follower: ", user)
  return res.status(200).json({ Follow: follow });
}

const newFollow = async (req, res, next) => {
  const { userID } = req.value.params;
  const { following } = req.value.body
  // Get user
  const followingUser = await User.findById(userID)
  const followedUser = await User.findById(following)
  console.log("followingUser: ", followingUser)
  console.log("followedUser: ", followedUser)
  // 
  // Create a new deck
  var followForFollwingUser = await Follow.find({owner: userID});
  if(!followForFollwingUser._id){
    followForFollwingUser = new Follow()
  } 

  followForFollwingUser.owner = followingUser._id
  followForFollwingUser.followings.push(following)
  console.log(followForFollwingUser)
  followingUser.follow = followForFollwingUser._id

  var followForFollwedUser = await Follow.find({owner: following});
  if(!followForFollwedUser._id){
    followForFollwedUser = new Follow()
  } 

  followForFollwedUser.owner = followedUser._id
  followForFollwedUser.followers.push(following)
  console.log(followForFollwedUser)
  followedUser.follow = followForFollwedUser._id

  followingUser.save()
  followedUser.save()

  followForFollwedUser.save()
  followForFollwingUser.save()
  
  
  // Assign user as a deck's owner
  // newDeck.owner = user;
  // console.log(newDeck.owner)
  
  // Save the deck
  // await newDeck.save();
  
  // Add deck to user's decks array 'decks'
  // user.decks.push(newDeck._id);


  return res.status(200).json({ success: true });
}

const getFollower = async (req, res, next) => {

}

const getFollowing = async (req, res, next) => {
  
}

const deleteFollow = async (req, res, next) => {
  
}

module.exports = {
  getFollow,
  getFollower,
  getFollowing,
  newFollow,
  deleteFollow,
}