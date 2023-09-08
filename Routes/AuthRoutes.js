const express = require("express")

const AuthRouter = express.Router()

const AuthControls = require("../Controllers/Authentication")

AuthRouter.get("/", AuthControls.getAuth)
AuthRouter.post("/signup", AuthControls.postSignUp)
AuthRouter.post("/login", AuthControls.postLogin)
AuthRouter.get("/getusers", AuthControls.getUsers)

module.exports= AuthRouter