const sequelize = require("../config/dbConnect");
const {DataTypes} = require("sequelize");

const chats = sequelize.define('chats', {
    userId :{
        type:DataTypes.INTEGER,
        allowNull:false,
        require:true
    },
    chat:{
        type:DataTypes.STRING,
        allowNull:true
    },
    imageUrl:{
        type:DataTypes.STRING,
        allowNull:true
    },
    receiverId:{
        type:DataTypes.INTEGER,
        allowNull:false,
        require:true
    } 
});

module.exports = chats