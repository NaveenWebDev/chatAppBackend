const sequelize = require("../config/dbConnect");
const { DataTypes } = require("sequelize");

const groupMember = sequelize.define('groupMember', {
    groupId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
  }
);

module.exports = groupMember