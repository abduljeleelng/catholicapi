const express = require('express');
const {userById,allUsers,getUser,updateUser, updateAbout, updateStatus , deleteUser,addFollower,addFollowing,findPeople,removeFollower,removeFollowing,userPhoto} = require('../controllers/user');
const {requireSign} = require('../controllers/auth');

const router = express.Router();
const {createUserValidator} = require('../validator');

//any router containing user by Id, our route will first executing userById method
router.get('/alluser', allUsers);

//router.get('/user/:userId',requireSign,getUser);
router.get('/user/:userId', getUser);
//router.get('/user/:userId', getUser);
router.put('/user/:userId',requireSign,updateUser);
router.delete('/user/:userId',requireSign,deleteUser);
//
router.put("/user/follow", requireSign, addFollowing, addFollower);
router.put("/user/unfollow", requireSign, removeFollowing, removeFollower);
//about users 
router.put("/user/about/:userId", requireSign, updateAbout );
router.put("/user/status/:userId", requireSign, updateStatus );

// profile photo
router.get("/user/photo/:userId", userPhoto);

// who to follow
router.get("/user/findpeople/:userId", requireSign, findPeople);

router.param("userId",userById);

module.exports= router;