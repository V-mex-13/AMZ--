const jwtsicret = require('./jwt.js');
const jwt = require("jsonwebtoken")

function adminmd(req,res,next){
  const authHeader = req.headers.authorization
  // const usernmae = req.headers.Authorization
  // console.log(usernmae)
// const authHeader ="Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbmlkIjoiNjdkYmU2MzAzMzcwN2Q1ODljYWM1NTQxIiwiaWF0IjoxNzQyNDY0NTYwfQ.qLQyniy--_IHX1SP6SsUP5G2RQQlsGAeTDdz3YNshBE"


// console.log(authHeader)
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log("you are wrong parsion")

            return res.status(403).json({});

        }
 
        
   const token =authHeader.split(" ")
   console.log(token[1])
try {
 const decoded = jwt.verify(token[1], jwtsicret);
  next()
} catch (error) {
  res.json({msg: error})
}


 
}

     
    
     module.exports = adminmd






// const { jwtsicret } = require("./jwt.js");
// const jwt = require("jsonwebtoken");

// function adminmd(req, res, next) {
//     const authHeader = req.headers.authorization;

//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//         return res.status(403).json({});
//     }

//     const token = authHeader.split(' ')[1];

//     try {
//         const decoded = jwt.verify(token, jwtsicret);

//         // req.userId = decoded.userId;

//         next();
//     } catch (err) {
//         return res.status(403).json({});
//     }
// };

// module.exports = {
//   adminmd
// }

     
// //   function adminmd(req,res,next){
// //     // auth  fro admin middleware

// //     const username = req.headers.username;
// //     const password = req.headers.password;

// //  Admin.findOne({username, password})
// //  .then((value)=>{
// //     if(value){
// //         next()
// //     }
// //  }).catch((e)=>{
// //     res.json({msg: "not find"})
// //  })



// //  }
