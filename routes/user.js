const  express = require("express")
const {Product} = require('../db/db.js');

// const usermd =require('../middleware/user.js')
const {User} = require('../db/db.js');

const router = express.Router();

router.post('/signup',(req,res)=>{
  
   const   username = req.body.username;
 const  password = req.body.password;
 
 console.log(password)
     User.create({ username,password})
     .then((value)=>{  res.json({ msg: "user is created"})})
     .catch((e)=>{  res.json({ msg: "user is not created"})})



});




router.post('/products',async(req,res)=>{
    // all product list
   const allproduct = await  Product.find({})
res.json({allproduct: allproduct})
});



router.post('/product/:productid',async(req,res)=>{
    // product parcesing logic
    const productid = req.params.productid;
const  username = req.headers.username;



const comlited =  await User.updateOne({
    username,
},{
    "$push":{
       parchasedproduct:productid
    }
})

if(!comlited){

    res.json({msg: "somthing want wrong "})
}

res.json({msg:"parchased compled!",id:productid})

});




router.post("/paresdprodct",async(req,res)=>{
 const username = req.headers.username

 const user = await User.findOne({username})
console.log(user.parchasedproduct)

  const products = await Product.find({
_id :{
"$in": user.parchasedproduct
}

  



})
res.json({products: products})
})


module.exports = router;
