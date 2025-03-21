
// function(req,ris,next){
//     const authHeader = req.headers.authorization

//     if(!authHeader || authHeader.startsWith('Bearer')){
//       res.status(403).json({msg:"you are wrong parsion"})
//  }

// }










// const {User} = require('../db/db');

//  async function usermd(req,res,next){
//     // auth  fro admin middleware

//     const username = req.headers.username;
//     const password = req.headers.password; 
//  User.findOne({
//     username,
//     password
//  }).then((value)=>{
//     if(value){
// console.log("md is ok")

//         next()
//     }
//  }).catch((e)=>{
//     res.json({msg: "not find"})
//  })


//  }
     
    
//      module.exports = usermd