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
        const msg = await MessagesDB.create({
            sent_to: send_to,
            message: message,
            time_stamp: date,
            userId: userID
        })
        res.status(200).json({ message: msg, status: true })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Somthing Went Wrong" })
    }
}

exports.getOneToOneMessages = async (req, res, next) => {
    const { userId, user2Id } = req.params
    // console.log(userId, user2Id,"<<<<<<<<<<<<")
    try {
        const messages = await MessagesDB.findAll({
            where: {
                [Op.or]:
                    [
                        { [Op.and]: [{ userId: userId }, { sent_to: user2Id },] },
                        { [Op.and]: [{ userId: user2Id }, { sent_to: userId },] }
                    ]
            },
            order: [['createdAt', 'ASC']]
        })
        res.status(201).json({ messages: messages })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Somthing Went Wrong" })
    }
}

exports.getAllMessage = async (req, res, next) => {
    const { userId } = req.params
    try {
        const messages = await MessagesDB.findAll({ where: { userId } })
        console.log(messages)
    } catch (err) {
        console.log(err, "ERRRRRRRRRRR")
    }
}