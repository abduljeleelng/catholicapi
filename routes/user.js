const express = require('express');
const {userById,allUsers,getUser,updateUser,deleteUser,addFollower,addFollowing,findPeople,removeFollower,removeFollowing,userPhoto} = require('../controllers/user');
const {requireSign} = require('../controllers/auth');

const router = express.Router();
const {createUserValidator} = require('../validator');

//any router containing user by Id, our route will first executing userById method
router.get('/alluser',allUsers);
router.get('/user/:userId',requireSign,getUser);
router.put('/user/:userId',requireSign,updateUser);
router.delete('/user/:userId',requireSign,deleteUser);
//
router.put("/user/follow", requireSign, addFollowing, addFollower);
router.put("/user/unfollow", requireSign, removeFollowing, removeFollower);

// photo
router.get("/user/photo/:userId", userPhoto);

// who to follow
router.get("/user/findpeople/:userId", requireSign, findPeople);

router.param("userId",userById);

module.exports= router;