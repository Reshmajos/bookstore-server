// register api request
exports.registerController = (req,res)=>{
    console.log("inside registercontroller");
    const {username,email,password} = req.body
    console.log(username,email,password);
    console.log(req.body);
    res.status(200).json("request received")
    
}

// login api
// user edit profile
// admin edit profile