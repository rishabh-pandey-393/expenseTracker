const mongoose = require('mongoose');
const {Schema}=mongoose;
const expenseSchema = new Schema ({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    type:{
        type:String,
        required:true,
    },
    amount:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now(),
        required:true,
    },
    cat:{
        type:String,
        required:true,
        
    },
    InterestType:{
        type:String,
    },
    percentage:{
        type:String,
    },
    receipt:{
        type:String,
    }


},{timestamps:true})

var Expense=mongoose.model("Expense",expenseSchema)

module.exports=Expense;