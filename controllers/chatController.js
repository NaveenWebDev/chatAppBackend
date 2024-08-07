const ChatSchema = require("../models/chats");
const { Op, where } = require("sequelize");
const User = require("../models/users");
const Group = require("../models/group");
const GroupChats = require("../models/groupChats");
const GroupMember = require("../models/groupMembers");

exports.getUserDataForChat = async (req, res) => {
  const { userName } = req.params;

  try {
    if (userName === "all") {
      const userDta = await User.findAll({
        attributes: ["id", "userName", "imageUrl"],
      });

      return res.status(200).json({
        success: true,
        message: "data fetched successfully",
        result: userDta,
      });
    } else {
      const userDta = await User.findAll({
        where: {
          [Op.or]: [
            {
              userName: {
                [Op.like]: `%${userName}%`,
              },
            },
          ],
        },
        attributes: ["id", "userName", "imageUrl"],
      });

      return res.status(200).json({
        success: true,
        message: "data fetched successfully",
        result: userDta,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: true,
      message: err.message,
    });
  }
};

exports.getUserDataForChatById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await User.findAll({
      where: {
        id,
      },
      attributes: ["id", "userName", "imageUrl"],
    });

    return res.status(200).json({
      success: true,
      message: "data fetched successfully",
      result,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.createChat = async (req, res) => {
  try {
    const { userId, chat, fileUrl, receiverId } = req.body;

    await ChatSchema.create({
      userId,
      chat,
      imageUrl: fileUrl,
      receiverId,
    });

    return res.status(200).json({
      success: true,
      message: "Chats saved success",
    });
  } catch (err) {
    return res.status(500).json({
      success: true,
      message: err.message,
    });
  }
};

exports.receiveChats = async (req, res) => {
  try {
    const { userId, receiverId } = req.params;

    if (!receiverId || !userId) {
      return res.status(500).json({
        success: false,
        message: "all fields are required",
      });
    }

    const mychats = await ChatSchema.findAll({
      where: {
        [Op.or]: [
          { userId: userId, receiverId: receiverId },
          { userId: receiverId, receiverId: userId },
        ],
      },
    });
    return res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      result: mychats,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ======================groups=====================

exports.createGroup = async (req, res) => {
  try {
    const { name } = req.params;

    const group = await Group.create({
      name,
      imageUrl: `https://api.dicebear.com/5.x/initials/svg?seed=${name}`,
    });

    return res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      result: group,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.receiveGroup = async (req, res) =>{
  try{
    const groups = await Group.findAll();

    return res.status(200).json({
      success: true,
      message: "Data fetched successfully",
      result: groups,
    });

  }catch(err){
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

exports.addGroupMember = async (req, res) => {
  try {
    const { groupId, userId } = req.body;
    const groupMember = await GroupMember.create({ groupId, userId });
    return res.status(200).json({
      success: true,
      message: "Data add successfully",
      result: groupMember,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
exports.getGroupDataForChatById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await Group.findAll({
      where: {
        id,
      },
      attributes: ["id", "name", "imageUrl"],
    });

    return res.status(200).json({
      success: true,
      message: "data fetched successfully",
      result,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


exports.sendGroupMessage = async (req, res) => {
  try {
    const { groupId, message ,userId, userName } = req.body;

    const member = await GroupMember.findOne({
      where: {
        groupId: groupId,
        userId: userId
      }
    });
    if(member){
      const groupMessage = await GroupChats.create({ groupId, userId, message, userName });
      return res.status(200).json({
        success: true,
        message: "Data send successfully",
        result: groupMessage,
      });
    }
      return res.status(500).json({
        success: false,
        message: "sorry you can't send message on this group because you are not a member of this group",
      });
    
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
exports.getGroupMessages = async (req, res) => {
  try {
    const { groupId } = req.params;
    const messages = await GroupChats.findAll({
      where: { groupId },
    });
    return res.status(200).json({
        success: true,
        message: "Data fetched successfully",
        result: messages,
      });
  } catch (err) {
    return res.status(500).json({
        success: false,
        message: err.message,
      });
  }
};
