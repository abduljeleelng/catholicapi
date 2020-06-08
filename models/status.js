const mongoose = require('mongoose');
const {ObjectId}= mongoose.Schema;
const statusSchema = new mongoose.Schema({
    /*
    expire_at: {
        type: Date, 
        default: Date.now, 
        expires: 50
    },
    */
   
    expireAt: {
        type: Date,
        default: Date.now,
        expires: '86400',
    },
    status: {
        type: String,
        required: true
    },
    photo: {
        data: Buffer,
        contenType: String
    },
    statusBy: {
        type: ObjectId,
        ref: "User"
    },
    created:{
        type: Date,
        default: Date.now(),
       // createIndexes: { expires: '30m' },
    },
});

module.exports=mongoose.model("Status",statusSchema );