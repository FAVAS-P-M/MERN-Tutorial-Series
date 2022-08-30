const asyncHandler=require('express-async-handler');
const User=require('../models/userModel');
const generateToken = require('../utils/generateToken');


const registerUser=asyncHandler(async(req,res)=>{
console.log(req.body)
console.log("hello")
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
    const{errors,isValid}=validateLoginForm(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }
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

//get the all users
const getAllUsers = asyncHandler(async (req, res) => {
    try {
      const users = await User.find({});
      res.json(users);
    } catch (error) {
      res.json(error);
    }
  });
  
  //delete user 
  const deleteUser = asyncHandler(async (req, res, next) => {
    console.log("111111111111",req.params.id)
    try {
      const user = await User.findById(req.params.id);
      await user.remove();
      res.json({});
    } catch (error) {
      res.json(error);
    }
  });
  
  //get a user 
  const getuser = asyncHandler(async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      res.json(user);
    } catch (error) {
      res.json(error);
    }
  });
  
  
  const updateUser = asyncHandler(async (req, res) => {
    console.log(req.body,"booooooo")
    try {
      const newUserData = {
        name: req.body.name,
        email: req.body.email,
      };
      const user = await User.findByIdAndUpdate(req.params.userId, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      });
      console.log(user)
      res.status(200).json({
        success: true,
      });
    } catch (error) {
      res.json(error);
    }
  });

  // const check=(req,res)=>{
  //   res.send('check done')

  // }



module.exports={registerUser,authUser,getAllUsers,deleteUser,getuser,updateUser}