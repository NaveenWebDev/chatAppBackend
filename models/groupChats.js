const sequelize = require("../config/dbConnect");
const { DataTypes } = require("sequelize");

const groupMessage = sequelize.define('groupMessage', {
    groupId: {
      type: DataTypes.INTEGER,
      allowNull:false
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull:false
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  }
);

module.exports = groupMessage;