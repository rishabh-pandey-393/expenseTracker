const Expense=require("../models/expense");

const totalMoney=async(req,res)=>{
    try{
        const expenses=await Expense.find({user:req.user._id});
        var total=0;
        expenses.forEach(expense => {
            if(expense.type==="Credit"){
               total+=Number(expense.amount);
           }
        });
        res.json(total);
    } catch(err){
        console.log(err);
    }
}

const Debit=async(req,res)=>{
    try{
        const expenses=await Expense.find({user:req.user._id});
        var want=0,need=0;
        expenses.forEach(expense => {
           if(expense.type==="Debit"){
                var ec=expense.cat;
                if(ec=="Streaming Services" || ec=="Personal Expense" || ec=="Pets" || ec=="Fitness" || ec=="Gifts and Donations" || ec=="Investments" || ec=="Other Expenses"){
                    want+=Number(expense.amount);
                }
                else{
                    need+=Number(expense.amount);
                }
           }
        });
        res.json({want,need});
    } catch(err){
        console.log(err);
    }
}
module.exports={totalMoney,Debit};