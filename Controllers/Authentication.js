const UserDB = require("../Models/User")
const { Op } = require("sequelize")
const bcrypt = require("bcrypt")
const saltround = 10


exports.getAuth = async (req, res, next) => {
    res.send("Shubham Mahulkar")
}

exports.postUserDetails = async (req, res, next) => {
    const { Name, Email, Mobile, Password } = req.body
    try {
        const existUser = await UserDB.findOne({ where: { [Op.or]: [{ email: Email }, { mobile: Mobile }] } })
        if (existUser) {
            console.log(existUser, "existUser")
            res.status(409).json({ message: "User Already Exist" })
        } else {
            bcrypt.hash(Password, saltround, async (err, hash) => {
                if (err) {
                    console.log(err, "In Bcrypt")
                    throw new Error("Somthing Wrong")
                } else {
                    await UserDB.create({
                        Name: Name,
                        email: Email,
                        mobile: Mobile,
                        password: hash
                    })
                    res.status(201).json({ message: "User Register Successfully", status: true })
                }
            })
        }
    } catch (err) {
        console.log(err, "ERRRO FORM POST")
        res.status(500).json({ message: "Somthing bad in our side" })
    }
}