
const asyncHandler = require('express-async-handler');
const Admin = require('../models/adminModel');
const generateToken = require('../utils/generateToken');
const validateLoginForm = require('../validation/login');

// const regAdmin=asyncHandler(async(req,res)=>{
// const {email,password}=req.body;
// const{errors,isValid}=await validateRegisterForm(req.body);
// if(!isValid){
//     return res.status(400).json(errors)
// }

// const adminExists=await Admin.findOne({email});
// console.log(adminExists)

// if(adminExists){
// errors.email="this email already exists";
// return
// res.status(400).json(errors)

// }

// const admin=await Admin.create({
    
// email,
// password,
// })

// if(admin){
// res.status(201).json({

// _id:admin._id,
// email:admin.email,
// isAdmin:admin.isAdmin,
// token:generateToken(user._id)
// })
// }else{
// res.status(400);
// throw new Error("Error occured")

// }

// })



const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { errors, isValid } = validateLoginForm(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const admin = await Admin.findOne({ email });
  if (admin) {
    let notMatch = await admin.matchPassword(password);
    if (notMatch) {
      res.json({
        _id: admin._id,
        name: admin.email,
        password: admin.password,
        token: generateToken(admin._id),
      });
    } else {
      errors.password = 'Password inccorrest';
      res.status(400).json(errors);
    }
  } else {
    errors.email = 'Email not found';
    res.status(400).json(errors);
  }
});

module.exports = { authAdmin};