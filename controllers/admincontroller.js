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

const loadLogin = async(req,res)=>{
    try {
        res.render("login")
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
                if(userData.is_admin===0){
                    res.render("login",{message:"Invalid credentials"})
                }else{
                    req.session.admin_id = userData.id
                    res.redirect("/admin/home")
                }
            }else{
                res.render("login",{message:"Invalid credentials"}) 
            }
        }else{
            res.render("login",{message:"Invalid credentials"})
        }
    } catch (error) {
        console.log(error.message)
    }
}

const loadDashboard = async(req,res)=>{
    try {
        const userData = await User.findById({_id:req.session.admin_id})
        res.render("home",{admin:userData})
    } catch (error) {
        console.log(error.message)
    }
}

const logout = async(req,res)=>{
    try {
        req.session.admin_id=null
        res.redirect("/admin")
    } catch (error) {
        console.log(error.message)
    }
}

const adminDashboard = async(req,res)=>{
    try {
        const usersData = await User.find({is_admin:0})
        res.render("dashboard",{users:usersData})
    } catch (error) {
        console.log(error.message)
    }
}

const newUserLoad = async(req,res)=>{
    try {
        res.render("new-user")
    } catch (error) {
        console.log(error.message)
    }
}

const addUser = async(req,res)=>{
    try {
        const name = req.body.name
        const email = req.body.email
        const spassword = await securePassword(req.body.password)
        const user = new User({
            name:name,
            email:email,
            password:spassword,
            is_admin:0
        })
        const userData = await user.save()

        if(userData){
            res.redirect("/admin/dashboard")
        }else{
            res.render("new-user",{message:"Something went wrong"})
        }
    } catch (error) {
        console.log(error.message)
    }
}

const editUserLoad = async(req,res)=>{
    try {
        const id = req.query.id
        const userData = await User.findById({_id:id})
        if(userData){
            res.render("edit-user",{user:userData})
        }else{
            res.redirect("/admin/dashboard")
        }
        
    } catch (error) {
        console.log(error.message)
    }
}

const updateUser = async(req,res)=>{
    try {
        
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = {
    loadLogin,
    verifyLogin,
    loadDashboard,
    logout,
    adminDashboard,
    newUserLoad,
    addUser,
    editUserLoad,
    updateUser
}