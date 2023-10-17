const Budget=require("../models/Budget");

// const defaultBudget=async(req,res)=>{
//     const {email}=req.body;
//     try{

//         const budget=await Budget.create({
//             email,
//             saves:20,
//             needs:50,
//             wants:30,
//         })
//         res.send(budget);

//     } catch(err){
//         console.log(err);
//     }
// }

const editBudget=async(req,res)=>{
    const {email}=req.body;
    try{
        const {wants,needs,saves}=req.body;
        const newBudget={};

        if(Number(wants)<0 || Number(wants)>100)
        {
            return res.json({
                error:"Enter All Percentages Accordingly."
            })
        }
        
        if(Number(needs)<0 || Number(needs)>100)
        {
            return res.json({
                error:"Enter All Percentages Accordingly."
            })
        }

        if(Number(saves)<0 || Number(saves)>100)
        {
            return res.json({
                error:"Enter All Percentages Accordingly."
            })
        }

        // console.log(Number(needs)+Number(wants)+Number(saves));

        if((Number(needs)+Number(wants)+Number(saves))!==100)
        {
            return res.json({
                error:"Enter All Percentages Accordingly."
            })
        }
        
        if(wants){
            newBudget.wants=wants;
        }
        if(needs){
            newBudget.needs=needs;
        }
        if(saves){
            newBudget.saves=saves;
        }
    
        let budget=await Budget.findOne({email})
        if(!budget){
            return res.status(404).send("Not Found");
        }

        budget=await Budget.findOneAndUpdate(email,{$set:newBudget},{new:true})
        res.json({budget});

    } catch(err){
        console.log(err);
    }
}

const getBudget=async(req,res)=>{
    const email=req.user.email;
    try{
        const budget=await Budget.findOne(email)
        res.json(budget);
    } catch(err){
        console.log(err);
    }
}

module.exports={editBudget,getBudget};