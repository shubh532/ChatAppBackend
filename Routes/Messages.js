const express = require("express")

const MessagesRouter = express.Router()

const MessagesController = require("../Controllers/Messages")

MessagesRouter.get("/", MessagesController.getMessages)
MessagesRouter.post("/sent_to/:send_to", MessagesController.postMesssages)
MessagesRouter.get("/:userId/:user2Id", MessagesController.getOneToOneMessages)
module.exports = MessagesRouter 