const {DataTypes } = require('sequelize');
const sequelize = require("../config/dbConnect");

const User = sequelize.define('userlogin', {
  userName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull:false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull:false
  },
  email: {
    type: DataTypes.STRING,
    allowNull:false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull:false
  },
  password: {
    type: DataTypes.STRING,
    allowNull:false
  },
},{
    tableName:"userlogin"
});

module.exports = User;