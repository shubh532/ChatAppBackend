require("dotenv").config()
const express = require("express")
const bodParser = require("body-parser")
const cors = require("cors")
const AuthenticationRoutes = require("./Routes/AuthRoutes")
const ConnectDB = require("./Util/Database")
const app = express()

const corsOptions ={
    origin:"http://localhost:3000"
}

app.use(cors(corsOptions))
app.use(bodParser.json())

app.use("/authenction",AuthenticationRoutes)

ConnectDB.sync()
    .then(() => {
        app.listen(4000, "localhost", () => {
            console.log("http://localhost:4000")
        })
    })
    .catch(err => console.log(err, "this err from App.js file"))
