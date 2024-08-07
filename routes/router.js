const express = require("express");
const router = express.Router();
const checkToken = require("../middleware/middleware")     
const {onlineUsers} = require("../index")     

const { signup, login } = require("../controllers/auth");
const {imageUpload} = require("../controllers/fileUpload")
const {
    getUserDataForChat, 
    getUserDataForChatById,
    createChat,
    receiveChats,
    // ================group controllers===========
    createGroup,
    addGroupMember,
    sendGroupMessage,
    getGroupMessages,
    receiveGroup,
    getGroupDataForChatById,
} = require("../controllers/chatController")

router.post("/signup", signup);
router.post("/login", login);

router.get("/getUserDataForChat/:userName", checkToken, getUserDataForChat)
router.get("/getUserDataForChatById/:id", checkToken, getUserDataForChatById)

router.post("/createChat", checkToken,  createChat)
router.get("/receiveChats/userId=:userId/receiverId=:receiverId", checkToken, receiveChats)
router.post("/imageUpload", checkToken, imageUpload)

router.post('/createGroup/:name', checkToken, createGroup);
router.post('/addGroupMember', checkToken, addGroupMember);
router.get('/receiveGroup', checkToken, receiveGroup);
router.post('/sendGroupMessage', checkToken, sendGroupMessage);
router.get('/getGroupMessages/:groupId', checkToken, getGroupMessages);
router.get('/getGroupDataForChatById/:id', checkToken, getGroupDataForChatById);

module.exports = router;