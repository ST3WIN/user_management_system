const User = require("../models/userModel")
const bcrypt = require("bcrypt")

const securePassword = async(password)=>{
    try {
        const passwordHash = await bcrypt.hash(password,10)
        return passwordHash
    } catch (error) {
        console.log(error.message)
    }
}

const loadRegister = async(req,res)=>{
    try {
       return res.render("registration")
    } catch (error) {
        console.log(error.message)
    }
}

const insertUser = async(req,res)=>{
    try {
        const spassword = await securePassword(req.body.password)
        console.log("Request Body:", req.body)
        const user = new User({
            name:req.body.name,
            email:req.body.email,
            password:spassword,
            is_admin:0
        });
        const userData = await user.save();
        
        if(userData){
        //    return res.render("registration",{msg:"Succesfully registered!"})
              return res.redirect("/login?msg=Succesfully registered");
        }else{
          return  res.render("registration",{msg:"Registration failed!"});
        }
    } catch (error) {
        console.log(error.message)
        return res.render("registration",{msg:"Check email And password"})
    }
}

// user login methods

const loginLoad = async(req,res)=>{
    try {
        const msg = req.query.msg || "";
      return  res.render("login",{msg})
    } catch (error) {
      console.log(error.message)  
    }
}

const verifyLogin = async(req,res)=>{
    try {
        const email = req.body.email
        const password = req.body.password
       
        const userData = await User.findOne({email:email})
        if(userData){
            const passwordMatch = await bcrypt.compare(password,userData.password)
            if(passwordMatch){
                req.session.user_id = userData._id
                console.log('asd')
                return res.redirect("/home");
               
            }else{
                console.log("l")
                return res.render("login",{message:"Invalid credintials"}) 
            }
        }else{
            console.log("2")
            return res.render("login",{message:"Invalid credintials"})
        }
    } catch (error) {
        console.log(error.message)
    }
}

const loadHome = async(req,res)=>{
    try {
        const userData = await User.findById({_id:req.session.user_id});
        console.log('asdfg');
        return res.render("home",{user:userData});
        
        
    } catch (error) {
        console.log(error.message)
    }
}

const userLogout = async(req,res)=>{
    try {
        req.session.user_id=null
        return res.redirect("/")
    } catch (error) {
        console.log(error.message)
    }
}

//user profile update
const editLoad = async(req,res)=>{
    try {
        const id = req.query.id
        const userData = await User.findById({_id:id})
        if(userData){
            return res.render("edit",{user:userData})
        }else{
            return res.redirect("/home")
        }
    } catch (error) {
        console.log(error.message)
    }
}

const updateProfile = async(req,res)=>{
    try {
        const userData = await User.findByIdAndUpdate({_id:req.body.user_id},{$set:{name:req.body.name, email:req.body.email}})
        return res.redirect("/home")
    } catch (error) {
        console.log(error.message)
    }
}

module.exports ={
    loadRegister,
    insertUser,
    loginLoad,
    verifyLogin,
    loadHome,
    userLogout,
    editLoad,
    updateProfile
}