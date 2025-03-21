// const express = require('express')
const express = require('express')
// const bodyparser = require("body-parser")
const app = express()
const cors = require('cors')
const adminrouter = require('./routes/admin')
const bodyParser = require('body-parser');
const userrouter = require('./routes/user')



app.use(cors())
app.use(bodyParser.json())
app.use("/user",userrouter)

app.use("/admin",adminrouter)







app.listen(8000,()=>console.log("its run"))