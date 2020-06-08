const mongoose = require('mongoose');
const {ObjectId}= mongoose.Schema;
const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    photo: {
        data: Buffer,
        contenType: String
    },
    eventBy: {
        type: ObjectId,
        ref: "User"
    },
    created:{
        type: Date,
        default: Date.now(),
    },
});

module.exports=mongoose.model("Event",eventSchema);