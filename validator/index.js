exports.createPostValidator =(req,res,next)=>{
    //req.check('tittle',"title is required").notEmpty();
    req.check('tittle',"title is required");
    req.check('title','title must be 5 ').isLength({ min:5,max:200});
    req.check('body',"body is required");
    req.check('body','body must be 5 ').isLength({ min: 5,max:2000});
    const errors=req.validationErrors();
    if (errors) {
        const firstError = errors.map((errors) => errors.msg)[0];
        return res.status(400).json({errors: firstError})
    }
    next();
};
exports.createUserValidator =(req,res,next)=>{
    req.check('firstName',"name is required").notEmpty();
    req.check('lastName',"name is required").notEmpty();
    req.check('country',"name is required").notEmpty();
    req.check('age',"name is required").notEmpty();
    req.check('gender',"name is required").notEmpty();
    req.check('email','email required ').notEmpty();
    req.check('email','email must be between 5 to 200 ')
        .matches(/.+\@.+\..+/)
        .withMessage('please, enter valid email')
        .isLength({ min: 5,max:200});
    req.check('password',"password is required").notEmpty();
    req.check('password')
        .isLength({ min: 5,max:2000})
        .withMessage('password must contain at least 5 character')
        .matches(/\d/)
        .withMessage('password must contain at least one digit');
    const errors=req.validationErrors();
    if (errors) {
        const firstError = errors.map((errors) => errors.msg)[0];
        return res.status(400).json({errors: firstError})
    }
    next();
};