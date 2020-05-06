const About = require('../models/about');
const fs = require('fs');
const _ = require('lodash');
const formidable = require("formidable");

exports.aboutBy =(req,res,next,id)=> {
    User.find({aboutBy:id})
        .populate("aboutBy", "_id firstName lastName gender")
        .exec((err, about) => {
            console.log(JSON.stringify({err,about}))
            if (err || !about) { return res.status(400).json({error: "about by user not found"}) }
            req.about = about; //add profile property
            next();
        })
};
exports.getAbout=(req,res)=>{
    return res.json(req.about);
}

exports.allAbout = (req, res) => {
    About.find((err, users) => {
        if (err) {return res.status(400).json({ error: err})}
        res.json(users);
    })
};

exports.updateAbout = (req, res) => {
    const about  =  new About(req.body);
    //let about = req.about;
    //console.log(JSON.stringify(about))
     //about = _.extend(about, req.body); // extend - mutate the source object
     //about.aboutBy = req.profile;
     about.save(err=>{
        if(err){ return res.status(401).json({"message":"error in posting your status"});}
        res.status(200).json(result)
    })
    //next();
     /*about.updated = Date.now();*/
 };

exports.updatePhoto=(req,res)=>{
   let form = new formidable.IncomingForm();
    // console.log("incoming form data: ", form);
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if (err) { return res.status(400).json({ error: "Photo could not be uploaded"});}
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
        user.save((err, result) => {
            if (err) { return res.status(400).json({error: err});}
            user.hashed_password = undefined;
            user.salt = undefined;
            // console.log("user after update with formdata: ", user);
            res.json(result);
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
exports.coverPhoto = (req, res, next) => {
    if (req.profile.photo.data) {
        res.set(("Content-Type", req.profile.photo.contentType));
        return res.send(req.profile.photo.data);
    }
    next();
};
