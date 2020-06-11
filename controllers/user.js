const _ = require('lodash');
const User = require('../models/users');
const formidable = require("formidable");
const fs = require("fs");


exports.userById =(req,res,next,id)=> {
    User.findById(id)
        // populate followers and following users array
        .populate("following", "_id firstName lastName gender email")
        .populate("followers", "_id firstName lastName gender email")
        //.populate("friends", "_id firstName lastName gender email")
        .exec((err, user) => {
            if (err || !user) {
                return res.status(400).json({error: "user not found"})
            }
            req.profile = user; //add profile property
            next();
        })
};

exports.hasAutorization=(req,res,next)=>{
    const authorized = req.profile && req.auth && req.profile._id === req.auth._id;
    if (!authorized){
        return res.status(403).json({error:"you're not authorized to perform this action "})
    }
    next()
};
exports.allUsers=(req,res)=>{
    User.find((err, user)=>{
        if (err || !user){return res.status(400).json({error:err})}
         res.json({user})
    }).select("firstName lastName gender email updated created friends followers following")
};
exports.user=(req,res)=>{
  return res.json(req.profile)
};
exports.getUser=(req,res)=>{
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    return res.json(req.profile)
};
exports.updateUser=(req,res)=>{
    /*let user = req.profile;
    user=_.extend(user,req.body); //extend mutate the source object
    user.updated= Date.now();
    user.save((err)=>{
        if (err){return res.status(400).json({error:"unauthorised access"})}
        //req.user.hashed_password = undefined;
       // req.user._v = undefined;
        res.status(200).json({user})
    })
    */
   let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    ///console.log("incoming form data: ", form);
    form.parse(req, (err, fields, files) => {
        console.log(JSON.stringify(files));
        if (err) {return res.status(400).json({err,error: "Photo could not be uploaded"});}
        // save user
        let user = req.profile;
        // console.log("user in update: ", user);
        user = _.extend(user, fields);

        user.updated = Date.now();
        // console.log("USER FORM DATA UPDATE: ", user);

        if (files.photo) {
            user.photo.data = fs.readFileSync(files.photo.path);
            user.photo.contentType = files.photo.type;
        }
        
        if (files.cover) {
            user.cover.data = fs.readFileSync(files.cover.path);
            user.cover.contentType = files.cover.type;
        }
        user.save((err, result) => {
            if (err) {return res.status(400).json({  error: err });}
            user.hashed_password = undefined;
            user.salt = undefined;
            console.log("user after update with formdata: ", user);
            res.json({message:"your data successfully uploaded"});
        });
    });
};
exports.userPhoto = (req, res, next) => {
    if (req.profile.photo.data) {
        res.set(("Content-Type", req.profile.photo.contentType));
        return res.send(req.profile.photo.data);
    }
    next();
};
exports.deleteUser=(req,res,next)=>{
    let user = req.profile;
    user.remove((err,user)=>{
        if (err){return res.status(400).json({err})}
        //res.status(200).json({user})
        res.status(200).json({message:"user successfully Deleted "})
    });
};
// follow unfollow
exports.addFollowing = (req, res, next) => {
    User.findByIdAndUpdate(
        req.body.userId,
        { $push: { following: req.body.followId } },
        (err, result) => {
            if (err) {
                return res.status(400).json({ error: err });
            }
            next();
        }
    );
};

exports.addFollower = (req, res) => {
    User.findByIdAndUpdate(
        req.body.followId,
        { $push: { followers: req.body.userId } },
        { new: true }
    )
        .populate("following", "_id firstName lastName gender")
        .populate("followers", "_id firstName lastName gender")
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            result.hashed_password = undefined;
            result.salt = undefined;
            res.json(result);
        });
};

// remove follow unfollow
exports.removeFollowing = (req, res, next) => {
    User.findByIdAndUpdate(
        req.body.userId,
        { $pull: { following: req.body.unfollowId } },
        (err, result) => {
            if (err) {
                return res.status(400).json({ error: err });
            }
            next();
        }
    );
};

exports.removeFollower = (req, res) => {
    User.findByIdAndUpdate(
        req.body.unfollowId,
        { $pull: { followers: req.body.userId } },
        { new: true }
    )
        .populate("following", "_id firstName lastName gender")
        .populate("followers", "_id firstName lastName gender")
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            result.hashed_password = undefined;
            result.salt = undefined;
            res.json(result);
        });
};

exports.findPeople = (req, res) => {
    let following = req.profile.following;
    following.push(req.profile._id);
    User.find({ _id: { $nin: following } }, (err, users) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }
        res.json(users);
    }).select("firstName");
};

exports.updateAbout=(req,res,next)=>{
    let user = req.profile;
    user=_.extend(user,req.body); //extend mutate the source object
    user.updated= Date.now();
    user.save((err,user)=>{
        if (err){return res.status(400).json({error:"unauthorised access"})}
         user.hashed_password = undefined;
         user._v = undefined;
         user.photo=undefined;
        res.status(200).json({user})
        next();
    })
};

exports.updateStatus=(req,res,next)=>{
    let user = req.profile;
    user=_.extend(user,req.body); //extend mutate the source object
    user.updated= Date.now();
    user.save((err,user)=>{
        if (err){return res.status(400).json({error:"unauthorised access"})}
        user.hashed_password = undefined;
        user._v = undefined;
        user.photo=undefined;
        res.status(200).json({user})
        next();
    })
};

