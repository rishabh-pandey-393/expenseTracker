const express=require('express');
const { editBudget , defaultBudget ,getBudget } = require('../controllers/budget');
const { Debit } = require('../controllers/totalmoney');
const router=express.Router();
const { requireSignin } = require('../middlewares/auth');
router.post('/editBudget',requireSignin,editBudget);
router.get('/getBudget',requireSignin,getBudget);
router.get('/debit',requireSignin,Debit);
module.exports=router;