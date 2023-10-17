const Expense=require("../models/expense");

const monthReport=async(req,res)=>{
    const {cat,year}=req.body;
    try{

        if(!cat || !year) return res.status(404).send("Enter All Details Accordingly.");

        const expenses=await Expense.find({user:req.user._id});
        var a={
            Jan:0,
            Feb:0,
            Mar:0,
            Apr:0,
            May:0,
            Jun:0,
            Jul:0,
            Aug:0,
            Sep:0,
            Oct:0,
            Nov:0,
            Dec:0
        };
        expenses.forEach(expense => {
            if(expense.cat===cat && ((expense.date).toString()).slice(11,15)===year){
                // console.log((expense.date).toString());
                a[(((expense.date).toString()).slice(4,7))]+=Number(expense.amount);
            }
        });
        res.json(a);
    } catch(err){
        console.log(err);
    }
}

const yearReport=async(req,res)=>{
    const {cat,year}=req.body;
    try{
        if(!cat || !year) return res.status(404).send("Enter All Details Accordingly.");
        const expenses=await Expense.find({user:req.user._id});
        var year1=0,year0=0;
        expenses.forEach(expense => {
            if(expense.cat===cat){
                if(((expense.date).toString()).slice(11,15)===year)
                {
                    year1+=Number(expense.amount);
                }
                else if(Number(((expense.date).toString()).slice(11,15))+1===Number(year))
                {
                    year0+=Number(expense.amount);
                }
            }
        });
        res.json({year1,year0});
    } catch(err){
        console.log(err);
    }
}

module.exports={monthReport,yearReport}