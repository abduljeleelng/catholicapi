const Event = require('../models/event');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');

exports.eventById=(req, res, next, id)=>{
    const event = Event.findById(id)
        .populate("eventBy","_id firstName lastName email ")
        .exec((err, post)=>{
            if (err || !post){
                return res.status(400).json({error:err})
        }
            req.event=event;
            next();
        })
};

exports.postPhoto = (req,res,next)=>{
    res.set("Content-Type", req.post.photo.contentType);
    return res.send(req.event.photo.data);
};

exports.events =(req, res)=>{
    Event.find().sort( { created: -1 } )
    .populate("eventBy","_id firstName lastName email")
    .select("_id title created eventBy")
    .then((events)=>{
        res.status(200).json(events)
    })
    .catch(err=>console.log(err))
};

exports.eventByUser=(req,res)=>{
    Event.find({eventBy:req.profile._id})
        .populate("eventBy","_id firstName lastName")
        .sort({created:-1})
        .exec((err,posts)=>{
            if (err){return res.status(400).json({err})}
            res.json({posts})
        })
};

exports.createEvent = (req,res,next)=>{
    const event = new Event(req.body);
    event.eventBy = req.profile;
    event.save((err,event)=>{
        if(err || !event) return res.status(400).json({error:err});
        return res.status(200).json({event})
    });

    /*
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req,(err,fields, files)=>{
        if (err){
            return res.status(400).json({error:"image can't be uploaded"})
        }
        let event = new Event(fields);
        req.event.hashed_password = undefined;
        req.event.salt = undefined;
        event.eventBy = req.event;
        if (files.photo) {
           post.photo.data= fs.readFileSync(files.photo.path);
           post.photo.contentType = files.photo.type
        }
        event.save((err,result)=>{
            if (err){return res.status(400).json({err})}
            res.status(200).json({result})
        })
    });
    */
};



exports.event =(req,res)=>{
    Event.findById(req.event)
    .sort( { created: -1 } )
    .populate("eventBy","_id firstName lastName email")
    .select("_id eventBy title created")
    .then((event)=>{
        res.status(200).json(event)
    })
    .catch(error=>console.log(error));
}











