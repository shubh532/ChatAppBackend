const express = require("express")

const GroupRoutes = express.Router()

const groupController = require("../Controllers/Group")

GroupRoutes.post("/:userId", groupController.postCreateGroup)
GroupRoutes.get("/:groupId", groupController.getGroupMembers)
GroupRoutes.post("/admin/:userId", groupController.postMakeAdmin)
GroupRoutes.post("/admin/remove/:userId", groupController.postRemoveAsAdmin)




module.exports = GroupRoutes