const express = require('express');
const router = express.Router();
const {getAbout,allAbout,create,aboutBy,updatAbout} = require('../controllers/about');
const {userById} = require('../controllers/user');


router.get('/about/:aboutBy',getAbout);
//router.post('/about/:userId',updatAbout);

//router.delete('/status',getStatus);
//router.put('/status',getStatus);

router.param('userId',userById);
router.param("aboutBy",aboutBy)
module.exports= router;