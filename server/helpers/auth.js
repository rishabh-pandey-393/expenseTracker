const bcrypt=require('bcryptjs');
const hashPassword=async(password)=>{
    // return new Promise((resolve,reject)=>{
    //     // bcrypt.genSalt(12,(err,salt)=>{
    //     //     if(err){
    //     //         reject(err);
    //     //     }
    //     //     bcrypt.hash(password,salt,(err,hash)=>{
    //     //         if(err){
    //     //             reject(err);
    //     //         }
    //     //         resolve(hash);
    //     //     });
    //     // });
    //     const salt=await bcrypt.genSalt(10);
    //     const secPass=await bcrypt.hash(req.body.password,salt);
    // });

    const salt=await bcrypt.genSalt(10);
    const hashed=await bcrypt.hash(password,salt);

    return hashed;

};

const comparePassword=(password,hashed)=>{
    return bcrypt.compare(password,hashed);
}

module.exports={hashPassword,comparePassword}