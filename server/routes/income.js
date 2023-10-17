const express=require('express');
// const { editBudget , defaultBudget ,getBudget } = require('../controllers/budget');

const router=express.Router();
const { requireSignin } = require('../middlewares/auth');
const { totalMoney} = require("../controllers/totalmoney")
router.get('/totalMoney',requireSignin,totalMoney);

module.exports=router;