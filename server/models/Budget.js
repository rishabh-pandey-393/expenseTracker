const mongoose = require('mongoose');
const {Schema}=mongoose;
const budgetSchema = new Schema ({
    email:{
        type:String,
        required:true,
    },
    wants:{
        type:Number,
        required:true,
    },
    saves:{
        type:Number,
        required:true,
    },
    needs:{
        type:Number,
        required:true,
    }
},{timestamps:true})

var Budget=mongoose.model("Budget",budgetSchema)

module.exports=Budget;