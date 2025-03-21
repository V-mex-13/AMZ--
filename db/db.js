
const mongoose = require('mongoose')
const url  = require('../routes/dbu.JS')

// mongodb+srv://<db_username>:<db_password>@cluster0.z90dk.mongodb.net/
// mongodb+srv://meetvaghela:123@for.qxwf7.mongodb.net/
// makig schemsa stap-1
mongoose.connect(url)
.then(()=>console.log("conected"))
.catch((eror)=>console.log(`tha ${eror}`))




 const adminScheama = mongoose.Schema({
    // 
    username: String,
    password: String,
   })

   
 const userScheama = mongoose.Schema({
    //
    username: String,
    password: String,
    parchasedproduct: [{
      type : mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }]

   })

   const productScheama =mongoose.Schema({
// 
    title: String,
    description: String,
    imglink: String,
    price: String,
   })
 

//  stap-2 make modal
const User = mongoose.model('User',userScheama)
const Admin = mongoose.model('Admin',adminScheama)
const Product = mongoose.model('Product',productScheama)



// stap 3
module.exports = {
User,
Admin,
Product
}