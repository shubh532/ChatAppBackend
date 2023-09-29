const MessagesDB = require("../Models/Messages")
const GroupMembersDB = require("../Models/GroupMember")
const GroupDB = require("../Models/Group")
const UserDB = require("../Models/User")
const { Op } = require("sequelize")

exports.postCreateGroup = async (req, res, next) => {
    const { name, users } = req.body
    const Id = req.params.userId
    try {
        const Group = await GroupDB.create({
            Name: name
        })
        const { id } = Group
        const Users = users.map(user => ({ userId: user.userId, groupId: id }))
        const GroupUser = await GroupMembersDB.bulkCreate([...Users, { userId: Id, groupId: id }])
        res.status(200).json({ groupName: Group, users: GroupUser })
    } catch (err) {
        console.log(err, "While Creating Group")
    }
    res.end()
}


exports.getGroupMembers = async (req, res, next) => {
    const groupId = req.params.groupId
    try {
        const groupMembers = await GroupMembersDB.findAll({
            where: { groupId: groupId },
            attributes: ["id", "userId", "admin"]
        })
        const userID = groupMembers.map(user => user.userId)

        const users = await UserDB.findAll({
            where: { id: userID },
            attributes: ["id", "Name"]

        })

        const UpdateUser = users.map(user => ({
            ...user.dataValues,
            admin: groupMembers.find((groupUser) => groupUser.userId === user.id).admin
        }))
        res.status(200).json({ users: UpdateUser })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Somthing Went Wrong" })
    }
}


exports.postMakeAdmin = async (req, res, next) => {
    const { groupId, userId } = req.body
    try {
        const Response = await GroupMembersDB.update(
            { admin: true },
            {
                where: {
                    [Op.and]: [{ userId: userId, groupId: groupId }]
                }
            }
        )
        res.status(200).json({ message: "admin created" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Somthing Went Wrong" })

    }
}

exports.postRemoveAsAdmin = async (req, res, next) => {
    const { groupId, userId } = req.body
    try {
        const Response = await GroupMembersDB.update(
            { admin: false },
            {
                where: {
                    [Op.and]: [{ userId: userId, groupId: groupId }]
                }
            }
        )
        res.status(200).json({ message: "admin removed" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Somthing Went Wrong" })

    }
}