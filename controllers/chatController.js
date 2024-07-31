const ChatSchema = require("../models/chats")
const { Op, where,} = require("sequelize");
const User = require("../models/users");

exports.getUserDataForChat = async (req, res)=>{

    const {userName} = req.params;

    try{

        if(userName === "all"){
            const userDta = await User.findAll({
                attributes:["id","userName","imageUrl"]
            });

            return res.status(200).json({
                success:true,
                message:"data fetched successfully",
                result:userDta,
            })
        }else{
            const userDta = await User.findAll({
                where:{
                    [Op.or]:[{
                  userName:{
                      [Op.like]: `%${userName}%`
                    }
                },]
            },
            attributes:["id","userName","imageUrl"]
        });
        
        return res.status(200).json({
            success:true,
            message:"data fetched successfully",
            result:userDta,
        })
    }

    }catch(err){
        return res.status(500).json({
            success:true,
            message:err.message,
        })
    }
}

exports.getUserDataForChatById = async (req, res)=>{
    const {id} = req.params;
    try{
        const result = await User.findAll({
            where:{
                id
            },
            attributes:["id","userName","imageUrl"]
        });


        return res.status(200).json({
            success:true,
            message:"data fetched successfully",
            result
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:err.message,
        })
    }
}

exports.createChat = async (req, res) =>{
    try{

    const {userId, chat, fileUrl, receiverId} = req.body;

    await ChatSchema.create({
        userId,
        chat,
        imageUrl:fileUrl,
        receiverId
    })

    return res.status(200).json({
        success:true,
        message:"Chats saved success",
    })

    }catch(err){
        return res.status(500).json({
            success:true,
            message:err.message,
        })
    }

}

exports.receiveChats = async (req, res) =>{
    try{
    const {userId, receiverId} = req.params;

    if(!receiverId || !userId){
        return res.status(500).json({
            success:false,
            message:"all fields are required"
        })
    }


    const mychats = await ChatSchema.findAll({
        where: {
            [Op.or]: [
                { userId: userId, receiverId: receiverId },
                { userId: receiverId, receiverId: userId }
            ]
        }
    })
    return res.status(200).json({
        success:true,
        message:"Data fetched successfully",
        result:mychats
    })
    }catch(err){
        return res.status(500).json({
            success:true,
            message:err.message,
        })

    }

}