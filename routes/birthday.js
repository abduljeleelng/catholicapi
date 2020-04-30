const express = require('express');
const router = express.Router();
const {bday,bmonth} = require('../controllers/birthday');
const {userById} = require('../controllers/user');

router.get('/birthday',bday);
router.get('/birthday/month',bmonth);

//router.delete('/status',getStatus);
//router.put('/status',getStatus);

router.param('userId',userById);
module.exports= router;