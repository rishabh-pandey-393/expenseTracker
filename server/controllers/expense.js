const Expense=require("../models/expense");
const cloudinary=require('cloudinary');
const nodemailer=require('nodemailer');

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_NAME,
    api_key:process.env.CLOUDINARY_KEY,
    api_secret:process.env.CLOUDINARY_SECRET,
})
const addExpense= async(req,res)=>{
    
    const {type,
        InterestType,
        desc,
        amount,
        percentage,
        cat,
        date,
        receipt}=req.body;

    const {_id}=req.user;
    var flag=true;
    
    for(var i=0;i<amount.length;i++){
        if((amount[i]-'0')<0 || (amount[i]-'0')>9){
            flag=false;
            break;
        }
    }
    
    if(percentage){
        if(isNaN(percentage) || percentage[0]=='-'){
            return res.json({
                error:'Fill All The Required Details Correcty.',
            })
        }
    }
    if(!desc.length || !amount.length || !flag || !type.length || !cat.length){
        return res.json({
            error:'Fill All The Required Details Correcty.',
        })
    };
    try{
        const expense=await Expense.create({
            user:_id,
            type,
            InterestType,
            desc,
            amount,
            percentage,
            cat,
            date,
            receipt
        });
        res.send(expense);

    } catch(err){
        console.log(err);
        res.status(400);
    }
}

const addEmail=async(req,res)=>{

    const {type,
        desc,
        amount,
        cat,
        date,
    email}=req.body;

    try {
        let transporter = nodemailer.createTransport({
            service:"gmail",

            auth: {
              user: process.env.email, // generated ethereal user
              pass: process.env.pass, // generated ethereal password
            },
          });
        
          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: process.env.email, // sender address
            to: email, // list of receivers
            subject: "New Transaction Added.", // Subject line
            html: `<p>A New Transaction Was Added Corresponding To Date :- ${date}</p>
            <p><br></p>
            <p>Type:- ${type}</p>
            <p>Description:- ${desc}</p>
            <p>Amount:- ${amount}</p>
            <p>Category: - ${cat}`, // html body
          });
    } catch (error) {
        console.log(error);
    }
}

const showExpenses=async(req,res)=>{
    try{
        const expenses=await Expense.find({user:req.user._id})
        res.json(expenses);
    } catch(err){
        console.log(err);
    }
}

const deleteExpense=async(req,res)=>{
    const {_id}=req.user;
    try{

        // Finding the expense to be deleted
        let expense=await Expense.findById(req.params.id);
        if(!expense){
            return res.status(404).send("Not Found");
        }
        if(expense.user.toString()!==_id){
            return res.status(401).send("Not Allowed");
        }

        expense=await Expense.findByIdAndDelete(req.params.id);
        res.json({"Success":"Expense has been deleted",expense:expense});
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
}

const deleteEmail=async(req,res)=>{
    let expense=await Expense.findById(req.params.id);
    const {email}=req.body;
    
    try {
        let transporter = nodemailer.createTransport({
            service:"gmail",
            
            auth: {
                user: process.env.email, // generated ethereal user
                pass: process.env.pass, // generated ethereal password
            },
        });
        
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: process.env.email, // sender address
            to: email, // list of receivers
            subject: "Transaction Deleted.", // Subject line
            html: `<p>A Transaction Was Deleted Corresponding To Date :- ${(expense.date.toString()).slice(0,15)}</p>
            <p><br></p>
            <p>Type:- ${expense.type}</p>
            <p>Description:- ${expense.desc}</p>
            <p>Amount:- ${expense.amount}</p>
            <p>Category: - ${expense.cat}`, // html body
        });
        
}
catch (err) {
    console.log(err);
}
}

const uploadReceipt=async(req,res)=>{
    // console.log("req files=>",req.files);
    const result=await cloudinary.uploader.upload(req.files.image.path);
    // console.log("uploaded image url=>",result);
    res.json({
        url:result.secure_url,
        public_id:result.public_id
    })
}

module.exports={addExpense,showExpenses,deleteExpense,uploadReceipt,addEmail,deleteEmail};