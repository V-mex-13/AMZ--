const express = require('express');
const zod = require('zod');
const jwt = require('jsonwebtoken');

const {Admin} = require('../db/db.js');
const {Product} = require('../db/db.js');
const adminmd = require('../middleware/admin.js');
const jwtsicret = require('../middleware/jwt.js');
const router = express.Router();

//  router.post('/signup', (req,res)=>{
//     console.log('im in')
// //     // admin signup logic

//   const  username = req.body.username;
//    const  password = req.body.password;
// console.log(username)
// console.log(password)
//     Admin.create({username,password})
//     .then((value)=>{  res.json({ msg: "admin is created"})})
//     .catch((e)=>{  res.json({ msg: "admin is not created"})})
// // });


// })


router.post('/product',adminmd,async(req,res)=>{
    // produt creation logic
  try {
   const title= req.body.title;
   const description= req.body.description;
   const imglink= req.body.imglink;
   const  price= req.body.price

   const newproduct = await Product.create({
    title,
    description,
    imglink,
    price
})

res.json({
    msg:"product is crated",
    productid: newproduct._id
})

  } catch (error) {
    res.json({
    msg:" product is  not crated",

    })
  }

});


router.get('/all',adminmd,async(req,res)=>{
const filter = req.query.filter || "" ;
console.log(filter)
    // bring  all product logic
try {

  const all = await  Product.find({
     $or:[{
      title:{
        "$regex": filter
      }
    },{
      description:{
        "$regex": filter
      }
    }]
  })
    
  res.json(all)
} catch (error) {
    res.json({msg: "not found"})
}

});



const signupbody = zod.object({
  username : zod.string(),
  password : zod.string()
});

router.post('/signup',async(req,res)=> {
// zod validetion

console.log()
     const sucsess = signupbody.safeParse(req.body)
     if(!sucsess){
      return res.status(403).json({msg: "givs walid sintex"})
     }
    //  find user in user db
    const adminexist = await  Admin.findOne({
      username: req.body.username,
      
    }).catch((e)=>res.status(403).json({msg: "this erorr in finding"}))
    if(adminexist){
      return res.status(403).json({msg: "adin is allredy exist"})

    }
    // creat db
    
const admin =  await Admin.create({
  username: req.body.username,
  password: req.body.password
}).catch((e)=>res.status(403).json({msg: "user is not creat"}))
    // take id make jwt tockn

const adminid = admin._id
const token = jwt.sign({adminid},jwtsicret)

res.json({
  msg: "admin is created sucsessfully",
  token: token
  })
})


const loginbody = zod.object({
  username : zod.string(),
  password : zod.string()
});

router.post('/login',async(req,res)=>{

  const sucsses = loginbody.safeParse(req.body)  // validesion of zod 

  if(!sucsses){ 
    res.status(403).json({msg:"gives valid thing "})
  }

const admin =  await Admin.findOne({username: req.body.username})
.catch((e)=>res.json({msg: "its hapand in  admin find prosess"}))

if(admin.username){
const adminid = admin._id
const tokan = jwt.sign({adminid},jwtsicret) //tokan creat

res.json({
  msg: "work is don",

  tokan: tokan
})
}

})



router.delete('/delete/:id',adminmd,async(req,res)=>{
try {
  const id = req.params.id;
  console.log(id)
   const deleteid = await Product.deleteOne({_id:id})
  console.log(deleteid)
   res.json({
    msg:"its deleted",
    
   })
} catch (error) {
  res.json({
    error: error,
    
   })
}
 
})

module.exports = router;


