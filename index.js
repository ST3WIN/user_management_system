const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/user_management_system")

const express = require("express")
const app = express()
app.use(express.static('public'));

//for user routes
const userRoute = require("./routes/userRoute")
app.use("/",userRoute)

app.listen(3000,()=>{
    console.log("Sever is running on port 3000")
})