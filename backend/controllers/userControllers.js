const asyncHandler=require('express-async-handler');
const User=require('../models/userModel');
const generateToken = require('../utils/generateToken');


const registerUser=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body;
// const{errors,isValid}=await validateRegisterForm(req.body);
// if(!isValid){
//     return res.status(400).json(errors)
// }


    const userExists=await User.findOne({email});
    console.log(userExists)

if(userExists){
    errors.email="this email already exists";
    return
    res.status(400).json(errors)
   
}

const user=await User.create({
    name,
    email,
    password,
})

if(user){
res.status(201).json({

    _id:user._id,
    name:user.name,
    email:user.email,
    isAdmin:user.isAdmin,
    token:generateToken(user._id)
})
}else{
    res.status(400);
    throw new Error("Error occured")

}

});




const authUser=asyncHandler(async(req,res)=>{
    const {email,password}=req.body;
    // const{errors,isValid}=validateLoginForm(req.body);
    // if(!isValid){
    //     return res.status(400).json(errors);
    // }
   let user=await User.findOne({email});
   if(user){
    let notMatch=await user.matchPassword(password);
    if(notMatch){
   res.json({
        _id:user._id,
        name:user.name,
        email:user.email,
        isAdmin:user.isAdmin,
        token:generateToken(user._id)
    })
   }else{
    errors.password="Password incorrect";
    res.status(400).json(errors)
    
   }

}else{
    errors.email="User not found";
    res.status(400).json(errors)
}
});



module.exports={registerUser,authUser}