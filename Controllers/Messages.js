const MessagesDB = require("../Models/Messages")
const { Op } = require("sequelize")


exports.getMessages = async (req, res, next) => {
    res.send("shubhamD")
}


exports.postMesssages = async (req, res, next) => {
    const send_to = req.params.send_to
    const { message, date, userID } = req.body
    console.log({ message, date, userID })
    try {
        await MessagesDB.create({
            sent_to: send_to,
            message: message,
            time_stamp: date,
            userId: userID
        })
        res.status(200).json({ status: true })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Somthing Went Wrong" })
    }
}

exports.getOneToOneMessages = async (req, res, next) => {
    const { userId, user2Id } = req.params
    try {
        const messages = await MessagesDB.findAll({ where: { userId } })
        console.log(messages, "messages")
        res.status(201).json({ messages: messages })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Somthing Went Wrong" })
    }
}