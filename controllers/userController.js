const User = require("../models/userModel")
const loadRegister = async(req,res)=>{
    try {
        res.render("registration")
    } catch (error) {
        console.log(error.message)
    }
}

const insertUser = async(req,res)=>{
    try {
        console.log("Request Body:", req.body)
        const user = new User({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            is_admin:0
        });
        const userData = await user.save();
        
        if(userData){
            res.render("registration",{message:"Succesfully registered!"})
        }else{
            res.render("registration",{message:"Registration failed!"})
        }
    } catch (error) {
        console.log(error.message)
    }
}

module.exports ={
    loadRegister,
    insertUser
}