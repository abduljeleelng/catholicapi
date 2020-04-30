const express = require('express');
const router = express.Router();
const {createStatus,getStatus,statusBy} = require('../controllers/status');
const {userById} = require('../controllers/user');


router.post('/status/:userId',createStatus);
router.get('/status',getStatus);
router.post('/status',statusBy)
//router.delete('/status',getStatus);
//router.put('/status',getStatus);

router.param('userId',userById);
module.exports= router;