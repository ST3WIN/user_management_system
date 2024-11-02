const express = require("express")
const user_route = express()


user_route.set("view engine","ejs")
user_route.set("views","./views/users")

const bodyParser = require("body-parser")
user_route.use(bodyParser.json())
user_route.use(bodyParser.urlencoded({extended:true}))


const userController =  require("../controllers/userController")

user_route.get("/register",userController.loadRegister)
user_route.post("/register",userController.insertUser)

user_route.get("/login",userController.loginLoad)
user_route.get("/",userController.loginLoad)
user_route.post("/login",userController.verifyLogin)

user_route.get("/home",userController.loadHome)

module.exports = user_route