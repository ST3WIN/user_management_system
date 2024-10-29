const express = require("express")
const user_route = express()
const userController = require("../controllers/userController")

user_route.set("view engine","ejs")
user_route.set("views","./views/users")

user_route.get("/register",userController.loadRegister)

module.exports = user_route