const mongoose = require('mongoose');
const uuidv1 = require('uuid/v1');
const crypto = require('crypto');
const { ObjectId } = mongoose.Schema;

const userSchma = new mongoose.Schema({
    username:{
        type:String,
        trim:true,
    },
    firstName:{
        type:String,
        trim:true,
        require:true,
    },
    lastName:{
        type:String,
        trim:true,
        require:true,
    },
    gender:{
        type:String,
        trim:true,
        require:true,
    },
    day:{
        type:String,
        trim:true,
        require:true,
    },
    month:{
        type:String,
        trim:true,
        require:true,
    },
    year:{
        type:String,
        trim:true,
        require:true,
    },
    age:{
        type:String,
        trim:true,
        require:true,
    },
    country:{
        type:String,
        trim:true,
        require:true,
    },
    email:{
        type:String,
        trim:true,
        require:true,
        lowercase: true
    },
    hashed_password:{
        type:String,
        require:true,
    },
    salt:String,
    created:{
        type:Date,
        default:Date.now,
    },
    updated:Date,
    photo: {
        data: Buffer,
        contentType: String
    },
    about: {
        type: String,
        trim: true
    },
    occupation:{
        type: String,
        trim: true
    },
    education:{
        type: String,
        trim: true
    },
    address:{
        type: String,
        trim: true
    },
    interest:{
        type: String,
        trim: true
    },
    status:{
        type: String,
        trim: true
    },
    following: [{ type: ObjectId, ref: "User" }],
    followers: [{ type: ObjectId, ref: "User" }],
    friends: [{ type: ObjectId, ref: "User" }],
    resetPasswordLink: {
        data: String,
        default: ""
    },
    role: {
        type: String,
        default: "subscriber"
    }
});

///generating Virtual Password and Salt it
userSchma.virtual('password')
    .set(function (password) {
        //create temporary password
        this._password=password;
        ///generate timestamp
        this.salt=uuidv1();
        this.hashed_password=this.encryptPassword(password)
    })
    .get(function () {
        return this._password
    });

userSchma.methods ={
    authenticate:function(plainText){
        return this.encryptPassword(plainText)===this.hashed_password;
    },
    encryptPassword:function (password) {
        if (!password) return "";
        try {
           return crypto
               .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        }
        catch (error) {
            return ""
        }
    }
};
module.exports=mongoose.model("User",userSchma);