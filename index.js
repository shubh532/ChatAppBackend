require("dotenv").config()
const express = require("express")
const bodParser = require("body-parser")
const cors = require("cors")
const AuthenticationRoutes = require("./Routes/AuthRoutes")
const MessagesRouter = require("./Routes/Messages")
const ConnectDB = require("./Util/Database")
const app = express()
const User = require("./Models/User")
const Messages = require("./Models/Messages")
const Group_Members = require("./Models/GroupMember")
const Group = require("./Models/Group")
const group = require("./Models/Group")

const corsOptions = {
    origin: "http://localhost:3000"
}

app.use(cors(corsOptions))
app.use(bodParser.json())

app.use("/authenction", AuthenticationRoutes)
app.use("/messages", MessagesRouter)


User.hasMany(Messages)
Messages.belongsTo(User)
Group.hasMany(Messages)
Messages.belongsTo(Group)

Group.belongsToMany(User, { through: Group_Members })
User.belongsToMany(Group, { through: Group_Members })

ConnectDB.sync({ alter: true })
    .then(() => {
        app.listen(4000, "localhost", () => {
            console.log("http://localhost:4000")
        })
    })
    .catch(err => console.log(err, "this err from App.js file"))
