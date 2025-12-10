const users = require('../models/userModel')
// jsonwebtoken
const jwt = require('jsonwebtoken')

// register api request
exports.registerController = async (req,res)=>{
    console.log("inside registercontroller");
    const {username,email,password} = req.body
    console.log(username,email,password);

    try{
        // check mail in model
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(409).json("User already exist...Please Login")
        }else{
            const newUser = new users({
                username,email,password
            })
            // saving 
            await newUser.save()
            res.status(200).json(newUser)
        }
    }catch(error){
        console.log(error);
      res.status(500).json(error)
    }
    // console.log(req.body);
    
}

// login api
exports.loginController = async (req,res)=>{
    console.log("inside registercontroller");
    const {email,password} = req.body
    console.log(email,password);

    try{
        // check mail in model
        const existingUser = await users.findOne({email})
        if(existingUser){
            if(password==existingUser.password){
                // generate token
                const token = jwt.sign({userMail:existingUser.email,role:existingUser.role},process.env.JWTSECRET)
            res.status(200).json({user:existingUser,token})
            }else{
            res.status(401).json("Incorrect Email / Password")
        }}else{
            res.status(404).json("Account doesnot exists...")
        }
    }catch(error){
        console.log(error);
      res.status(500).json(error)
    }
    // console.log(req.body);
    
}

// google login

exports.googleLoginController = async (req,res)=>{
    console.log("inside registercontroller");
    const {email,password,username,picture} = req.body
    console.log(email,password,username,picture);

    try{
        // check mail in model
        const existingUser = await users.findOne({email})
        if(existingUser){
            // login
            // generate token
                const token = jwt.sign({userMail:existingUser.email,role:existingUser.role},process.env.JWTSECRET)
            res.status(200).json({user:existingUser,token})   
            }else{
            //  register
            const newuser = await users.create({
                username,email,password,picture
            })
            // generate token
                const token = jwt.sign({userMail:newuser.email,role:newuser.role},process.env.JWTSECRET)
            res.status(200).json({user:existingUser,token})
        }
    }catch(error){
        console.log(error);
      res.status(500).json(error)
    }
    // console.log(req.body);
    
}
// user edit profile
// admin edit profile