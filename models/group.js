const sequelize = require("../config/dbConnect");
const { DataTypes } = require("sequelize");

const group = sequelize.define("group",{
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull:false
      },
    userId: {
        type: DataTypes.STRING,
        allowNull:false
      },
  },
);

module.exports = group;
