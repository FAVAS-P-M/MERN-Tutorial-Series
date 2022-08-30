const express=require("express")
const router=express.Router()

const {authAdmin}=require('../controllers/adminControllers')
const {getAllUsers ,deleteUser ,getuser ,updateUser}=require('../controllers/userControllers')
// router.route('/admin').post(regAdmin)

router.route("/getusers").get(getAllUsers)
router.route("/adminlogin").post(authAdmin)
router.route("/deleteuser/:id").get(deleteUser)

router.route("/updateuser/:userId").post(updateUser)             





module.exports=router;