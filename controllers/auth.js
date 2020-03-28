const jwt = require('jsonwebtoken');
require('dotenv').config();
const expressJwt = require('express-jwt');
const User = require('../models/users');
const {sendEmail} = require('../helpers');

exports.signup = async (req,res)=>{
    const userExist = await  User.findOne({email:req.body.email});
    if (userExist) return res.status(400).json({error:"user already exist"});
    const user = await new User (req.body);
    //const user = new User(req.body);
    await user.save((err,user)=>{
        if(err || !user){return res.status(401).json({error:"registration fail, Please try again"})}
        //res.json(user);
        const emailData = {
            from: "noreply@imcatholic.org",
            to: "abduljeleelng@gmail.com",
            subject: "Welcome to The word of Christ, I am Ctholic",
            html: `<p>Testing Html content to send the mail</p>`
        };
        sendEmail(emailData);
        return res.status(200).json({
            message: `Dear ${user.firstName}, your registration succeful, you can get your mail for more details`
        });
    })
    //await user.save();
    //res.status(200).json({messages:'account successfully created'});
};

exports.signin=(req,res)=>{
    //find the user by mail
    const {email,password}=req.body;
    User.findOne({email},(err,user)=>{
        if (err || !user){
            return res.status(401).json({error:"email doesn't exist, please SignUp"})
        }
        if (!user.authenticate(password)){
            return res.status(401).json({error:"email and password not match"})
        }
        //generate token
        const token = jwt.sign(
            { _id : user._id},
            process.env.JWT_SECRET
            );
        //set token to the cookies
        res.cookie("t",token,{expre:new Date()+60})
        //send token and user details to the clint
        const {_id,email,name}= user;
        return res.status(200).json({token,user:{_id,name,email}})
    })
};

exports.signout=(req,res)=>{
    res.clearCookie("t");
    return res.json({message:"Sign out successfully"});
};

exports.requireSign = expressJwt({
    secret: process.env.JWT_SECRET,
    userProperty: "auth"
});