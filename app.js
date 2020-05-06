const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const cors = require('cors');

dotenv.config();

//app
const postRouter = require('./routes/post');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const statusRouter = require('./routes/status');
const birthdayRouter = require('./routes/birthday');
const aboutRouter = require('./routes/about');

mongoose
    .connect(process.env.MONGODB_URI, {useUnifiedTopology:true,useNewUrlParser:true,keepAlive:true,poolSize:30,socketTimeoutMS:360000*3600,connectTimeoutMS:36000*678 })
    .then(() => console.log(`DB Connected on port ${process.env.PORT}`))
    .catch(error=>console.log(error));
mongoose.connection.on("error", err => {console.log(`DB connection error: ${err.message}`);});

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.get("/api",(req,res)=>{
   // res.status(200).json({message:"api now working"})
    fs.readFile("docs/apiDocs.json",(error,data)=>{
        if(error){return res.status(400).json({error:error})}
        res.json(JSON.parse(data));
    })
    
});
app.use('/api', postRouter);
app.use('/api', authRouter);
app.use('/api', userRouter);
app.use('/api', statusRouter);
app.use('/api', birthdayRouter);
app.use('/api', aboutRouter);
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).json({error:'invalid token...'});
    }
    next();
});

const port = process.env.PORT || 8080;
app.listen(port, ()=>{console.log(`app listening to port ${port}`)});