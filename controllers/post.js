const Post = require('../models/post');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');
exports.postById=(req, res, next, id)=>{
    Post.findById(id)
        .populate("PostById","_id firstName lastName email ")
        .populate("comments.postedBy", "_id firstName lastName email ")
        //.select("_id title body created likes")
        .exec((err, post)=>{
            if (err || !post){
                return res.status(400).json({error:err})
        }
            req.post=post;
            next();
        })
};
exports.getPost =(req, res)=>{
    Post.find().sort( { created: -1 } )
    .populate("postedBy","_id firstName lastName email")
    .populate("comments.postedBy", "_id created firstName lastName email")
    .select("_id title body created postedBy comments likes")
    .then((posts)=>{res.status(200).json(posts)})
    .catch(err=>console.log(err))
};

exports.postPhoto = (req,res,next)=>{
    res.set("Content-Type", req.post.photo.contentType);
    return res.send(req.post.photo.data);
};

exports.photosList = (req, res,next)=>{
    
    Post.find({postedBy:req.profile._id})
    //.populate("postedBy","_id firstName lastName")
    .select("photo")
    .sort({created:-1})
    .exec((err,posts)=>{
        console.log(JSON.stringify(posts));
        if (err){return res.status(400).json({err})}
        //res.set("Content-Type",posts.contentType)
        res.send(posts)
    })
    //res.set("Content-Type",photo.contentType)
    //Post.find({"postedBy":"5ebdbf93e058480878630437"})
    //.select("_id title body created postedBy comments likes,photo")
    //.then((photo)=>{
    //    res.send(photo)
    //})
    //.catch(error=>console.log(error))
};




exports.singlePost =(req,res)=>{
    Post.findById(req.post)
    .sort( { created: -1 } )
    .populate("postedBy","_id firstName lastName email")
    .populate("comments.postedBy", "_id created firstName lastName email ")
    .select("_id postedBy title body created likes comments")
    .then((post)=>{res.status(200).json(post)})
    .catch(error=>console.log(error));
}

exports.singlePostA = (req, res) => {
   return res.json(req.post);
};

exports.createPost = (req,res,next)=>{
    /**** * post without file uploading
    const post = new Post(req.body);
    req.profile.hashed_password = undefined;
    req.profile.salt = undefined;
    post.postedBy = req.profile;
    //post.save().then(result=>{res.status(200).json({post:result})});
      post.save((err,result)=>{
           if (err){return res.status(400).json({error:err})}
           res.status(200).json({post:result})
       });
    console.log("Creating new Post",post);
    console.log("response",req.body);
    ***/
  
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req,(err,fields, files)=>{
        if (err){
            return res.status(400).json({error:"image can't be uploaded"})
        }
        let post = new Post(fields);
        req.profile.hashed_password = undefined;
        req.profile.salt = undefined;
        post.postedBy = req.profile;
        if (files.photo) {
           post.photo.data= fs.readFileSync(files.photo.path);
           post.photo.contentType = files.photo.type
        }
        post.save((err,result)=>{
            if (err){return res.status(400).json({err})}
            res.status(200).json({result})
        })
    });
};
exports.updatePost =(req,res,next)=>{
    let post = req.post;
    post = _.extend(post,req.body);
    post.updated = Date.now();
    post.save(err=>{
        if (err){
            return res.status(400).json({error:err});
        }
        res.json(post);
    });
}
exports.postsByUser=(req,res)=>{
    Post.find({postedBy:req.profile._id})
        .populate("postedBy","_id firstName lastName")
        .sort({created:-1})
        .exec((err,posts)=>{
            if (err){return res.status(400).json({err})}
            res.json({posts})
        })
};
exports.isPoster =(req, res, next)=>{
    let isPoster = req.post && req.auth && req.post.postedBy._id == req.auth._id;
    console.log("request post"+ req.post);
    console.log("request post"+ req.post.postedBy._id);
    console.log("request auth"+ req.auth);
    console.log("request auth"+ req.auth._id);
    if (!isPoster){return res.status(403).json({error:"you're not authorised"})};
    next();
};
exports.deletePost=(req, res)=>{
    let post = req.post;
    post.remove((err,post)=>{
        if(err){ return res.status(400).json({error:err})}
        res.json({message:"post successfully deleted"});
    })
};
exports.like = (req, res) => {
    Post.findByIdAndUpdate(
        req.body.postId,
        { $push: { likes: req.body.userId } },
        { new: true }
    ).exec((err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        } else {
            res.json(result);
        }
    });
};

exports.unlike = (req, res) => {
    Post.findByIdAndUpdate(
        req.body.postId,
        { $pull: { likes: req.body.userId } },
        { new: true }
    ).exec((err, result) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        } else {
            res.json(result);
        }
    });
};

exports.comment = (req, res) => {
    let comment = req.body.comment;
    comment.postedBy = req.body.userId;
    //comment.postedBy = req.post;
    Post.findByIdAndUpdate(
        req.body.postId,
        { $push: { comments: comment } },
        { new: true }
    )
        .populate("comments.postedBy", "_id firstName lastName email ")
        .populate("postedBy", "_id firstName lastName email ")
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            } else {
                res.json(result);
            }
        });
};

exports.uncomment = (req, res) => {
    let comment = req.body.comment;
    Post.findByIdAndUpdate(
        req.body.postId,
        { $pull: { comments: { _id: comment._id } } },
        { new: true }
    )
        .populate("comments.postedBy", "_id firstName firstName")
        .populate("postedBy", "_id firstName lastName")
        .exec((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            } else {
                res.json(result);
            }
        });
};



