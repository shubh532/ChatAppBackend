const UserDB = require("../Models/User")
const GroupDB = require("../Models/Group")
const Group_Members = require("../Models/GroupMember")
const { Op } = require("sequelize")
const bcrypt = require("bcrypt")
const saltround = 10
const generateAccessToken = require("../Util/JWT")

exports.getAuth = async (req, res, next) => {
    res.send("Shubham Mahulkar")
}

exports.postSignUp = async (req, res, next) => {
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

exports.postLogin = async (req, res, next) => {
    const { Email, Password } = req.body
    try {
        const ExistUser = await UserDB.findOne({ where: { Email } })
        if (!ExistUser) {
            res.status(404).json({ message: "User Not Exist", success: false })
        } else {
            const hash = ExistUser.password
            bcrypt.compare(Password, hash, (err, result) => {
                if (err) {
                    throw new Error({ message: "Somthing Went Worng" })
                } if (result) {
                    res.status(200).json({ message: "Successfully Login", userID: ExistUser.id, tokenID: generateAccessToken(ExistUser.id, ExistUser.email) })
                } else {
                    res.status(401).json({ message: "Incorrect Password", success: false })
                }
            })
        }
    } catch (err) {
        console.log(err, "from login route")
        res.status(500).json({ message: "Error Occurred while Login", error: err.message })
    }
}

exports.getUsers = async (req, res, next) => {
    const userid = req.params.userid
    try {
        const user = await UserDB.findByPk(userid, {
            attributes: ["id", "Name", "email", "mobile"],
            include: {
                attributes: ["id", "Name"],
                model: GroupDB,
                through: {
                    model: Group_Members,
                    attributes: ["id", "admin"]
                }
            }
        }
        )
        const users = await UserDB.findAll(
            {
                where: { [Op.not]: { id: userid } },
                attributes: ["id", "Name", "email", "mobile"]
            }
        )
        res.status(200).json({ userDetails: user, allUsers: users })
    } catch (err) {
        console.log(err, "form getUser")
        res.status(500).json({ message: "Somthing Went Wrong" })
    }
}