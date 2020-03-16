const express = require('express');
const {signup,signin,signout} = require('../controllers/auth');
const {userById} = require('../controllers/user');

const router = express.Router();
const {createUserValidator} = require('../validator');

router.post('/SignUp',createUserValidator,signup);
router.post('/SignIn',signin);
router.get('/SignOut',signout);
//any router containing user by Id, our route will first executing userById method
router.param("userId",userById);

module.exports= router;