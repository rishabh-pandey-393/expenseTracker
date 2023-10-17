const mongoose=require('mongoose');

const mongoURI=process.env.DATABASE

const connectToMongo=()=>{
    try{
        mongoose.connect(mongoURI,()=>{
        // console.log("Connected to mongo successfully.");
        })
    } catch(err){
        console.log("DB Connection error ", err);
    }
}

module.exports=connectToMongo;