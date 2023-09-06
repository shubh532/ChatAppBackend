const express = require("express")

const AuthRouter = express.Router()

const AuthControls = require("../Controllers/Authentication")

AuthRouter.get("/", AuthControls.getAuth)
AuthRouter.post("/signup", AuthControls.postUserDetails)

module.exports= AuthRouter