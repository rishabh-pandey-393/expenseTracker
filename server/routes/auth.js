const express=require('express')
const router=express.Router();
const {register,login,currentUser,deleteUser, changePassword, editUser,regEmail,delEmail,passEmail,editEmail}=require("../controllers/auth");
const { requireSignin } = require('../middlewares/auth');
router.post('/register',register);
router.post('/login',login);
router.get('/currentuser',requireSignin,currentUser);
router.delete('/deleteUser',requireSignin,deleteUser);
router.put('/changePassword',requireSignin,changePassword);
router.put('/editUser',requireSignin,editUser);
router.post('/regEmail',regEmail);
router.post('/delEmail',delEmail);
router.post('/passEmail',passEmail);
router.post('/editEmail',editEmail);
module.exports=router;