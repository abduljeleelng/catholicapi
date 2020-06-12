const express = require('express');
const router = express.Router();
const {getPost,createPost,postsByUser,postById,photosList ,isPoster,updatePost, deletePost,postPhoto,singlePost,like,unlike,comment,uncomment} = require('../controllers/post');
const {requireSign} = require('../controllers/auth');
const {userById} = require('../controllers/user');
const {createPostValidator} = require('../validator');


router.get('/posts',getPost);
//get Single Post with post Id 
router.get('/post/:postId',singlePost);

//post by a single user 
router.get('/post/by/:userId', postsByUser);
//router.get('/post/by/:userId',requireSign,postsByUser);

//post photo 
router.get('/posts/photo/:postId',postPhoto);

//post photo 
router.get('/posts/photo/list/:userId',photosList);

// like unlike
router.put("/post/like", requireSign, like);
router.put("/post/unlike", requireSign, unlike);

// comments
router.put("/post/comment", requireSign, comment);
router.put("/post/uncomment", requireSign, uncomment);

//router.post('/post',requireSign,createPostValidator,createPost);
//route for creating new post
router.post('/post/new/:userId',requireSign,createPost,createPostValidator);

//router.post('/post/new/:userId',createPost,);

//update post by post id  route 
//router.put('/post/:postId',updatePost);
router.put('/post/:postId',requireSign,isPoster,updatePost);

//delete post by Id
//router.delete('/post/:postId',requireSign, deletePost);
router.delete('/post/:postId',requireSign,isPoster, deletePost);
//any router containing user by Id, our route will first executing userById method
router.param("userId",userById);
//any router containing user by Id, our route will first executing userById method
router.param("postId",postById);

module.exports= router;



/*
const express = require("express");
const {
    getPosts,
    createPost,
    postsByUser,
    postById,
    isPoster,
    updatePost,
    deletePost,
    photo,
    singlePost,
    like,
    unlike,
    comment,
    uncomment
} = require("../controllers/post");
const { requireSignin } = require("../controllers/auth");
const { userById } = require("../controllers/user");
const { createPostValidator } = require("../validator");

const router = express.Router();

router.get("/posts", getPosts);

// like unlike
router.put("/post/like", requireSignin, like);
router.put("/post/unlike", requireSignin, unlike);

// comments
router.put("/post/comment", requireSignin, comment);
router.put("/post/uncomment", requireSignin, uncomment);

// post routes
router.post(
    "/post/new/:userId",
    requireSignin,
    createPost,
    createPostValidator
);
router.get("/posts/by/:userId", requireSignin, postsByUser);
router.get("/post/:postId", singlePost);
router.put("/post/:postId", requireSignin, isPoster, updatePost);
router.delete("/post/:postId", requireSignin, isPoster, deletePost);
// photo
router.get("/post/photo/:postId", photo);

// any route containing :userId, our app will first execute userById()
router.param("userId", userById);
// any route containing :postId, our app will first execute postById()
router.param("postId", postById);

module.exports = router;

*/