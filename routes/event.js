const express = require('express');
const router = express.Router();
const {events,createEvent,eventById,eventByUser} = require('../controllers/event');
const {requireSign} = require('../controllers/auth');
const {userById} = require('../controllers/user');
//const {createPostValidator} = require('../validator');


router.get('/events',events);
//get  single event by users
//router.get('/events/:eventId',singlePost);

//event  by a single user 
router.get('/events/by/:userId', eventByUser);
//router.get('/post/by/:userId',requireSign,postsByUser);

//post photo 
//router.get('/posts/photo/:postId',postPhoto);

//route for creating new post
router.post('/events/new/:userId',createEvent,requireSign,);

router.param("userId",userById);
//any router containing user by Id, our route will first executing userById method
router.param("eventId",eventById);

module.exports= router;
