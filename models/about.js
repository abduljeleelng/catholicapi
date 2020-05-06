const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');
const crypto = require('crypto');
const { ObjectId } = mongoose.Schema;

const AboutSchma = new mongoose.Schema({
    aboutBy: {
        type: ObjectId,
        ref: "User"
    },
    updated:Date,
    photo: {
        data: Buffer,
        contentType: String
    },
    cover: {
        data: Buffer,
        contentType: String
    },
    about: {
        type: String,
        trim: true
    },
    work:[{
        company: String,
        description:String,
        start:Date,
        end:Date
    }],
    education:[{
        level: String,
        school:String,
        start:Date,
        end:Date,
    }],
    address:{
        type: String,
        trim: true
    },
    interest:[{
        type: String,
        trim: true
    }],
    status:[{
        type: String,
        trim: true
    }],
});

module.exports=mongoose.model("About", AboutSchma);