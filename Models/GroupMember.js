const Sequelize = require("sequelize")

const sequelize = require("../Util/Database")

const group_members = sequelize.define("group_members", {
    id: {
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true
    }
})

module.exports = group_members