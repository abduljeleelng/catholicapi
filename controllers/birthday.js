const User = require('../models/users');
const now = new Date();
const day = now.getDate();     
const month = now.getMonth() + 1;

//console.log(JSON.stringify({now,day,month}));

exports.bday=(req,res)=>{
    User.find({day:day,month:month})
    .sort({firstName:-1,lastName:-1})
    .select("_id firstName lastName city country")
    .then((err,resul)=>{
        if(err || ! resul) return res.status(400).json(err)
        res.status(200).json(resul)
    })
},
exports.bmonth=(req,res)=>{
    User.find({month,"day":{$gt:day},})
    .sort({day:-1,firstName:-1,lastName:-1})
    .select("_id firstName lastName city country")
    .then((err,resul)=>{
        if(err || ! resul) return res.status(400).json(err)
        res.status(200).json(resul)
    })
}