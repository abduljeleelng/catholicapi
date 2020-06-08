const Status = require('../models/status');
const fs = require('fs');
const _ = require('lodash');

exports.createStatus = (req, res) =>{
    const status = new Status(req.body);
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    req.profile.followers = undefined;
    req.profile.following = undefined;
    req.profile.role = undefined;
    status.statusBy = req.profile;
    status.save((err,result)=>{
        if(err || !result) return res.status(401).json({"message":"error in posting your status"});
        res.status(200).json(result)
    })
};
exports.getStatus =(req,res)=>{
    Status.find()
    .sort({created : -1})
    .populate("statusBy","_id firstName lastName email")
    .select("_id status created statusdBy expireAt ")
    .then((err,result)=>{
        if(err || !result) return res.status(400).json(err)
        res.status(200).json(result)
    }).catch(e=>console.log(e))    
};

exports.statusBy=(req,res)=>{
    //console.log(JSON.stringify(req.body));
    Status.find({statusBy:req.body})
    .sort({created:-1})
    .populate("statusBy","_id firstName lastName email")
    .select("_id status created statusBy ")
    .then((err,result)=>{
        if(err || !result) return res.status(400).json(err)
        res.status(200).json(result)
    }).catch(e=>console.log(e)) 
};