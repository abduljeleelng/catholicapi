const mongoose = require('mongoose');
const {ObjectId}= mongoose.Schema;
const postSchma = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    photo: {
        data: Buffer,
        contenType: String
    },
    postedBy: {
        type: ObjectId,
        ref: "User"
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date,
    likes: [{ type: ObjectId, ref: "User" }],
    comments: [
        {
            text: String,
            created: { type: Date, default: Date.now },
            postedBy: { type: ObjectId, ref: "User" }
        }
    ]
   /* title:{
        type:String,
        require:true,
        minlength:4,
        maxLength:150,
    },
    body:{
        type:String,
        require:true,
        minlength:5,
        maxlength:2050,
    },
    photo:{
        data:Buffer,
        contentType:String,
    },
    postedBy:{
        type:ObjectId,
        ref:"User"
    },
    created:{
        type:Date,
        default:Date.now
    }
    */
});

module.exports=mongoose.model("Post",postSchma);