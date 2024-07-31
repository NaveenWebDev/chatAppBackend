const express = require("express");
const router = express.Router();

const { signup, login } = require("../controllers/auth");

const {
    getUserDataForChat, 
    getUserDataForChatById,
    createChat,
    receiveChats,
} = require("../controllers/chatController")

router.post("/signup", signup);
router.post("/login", login);

router.get("/getUserDataForChat/:userName", getUserDataForChat)
router.get("/getUserDataForChatById/:id", getUserDataForChatById)

router.post("/createChat", createChat)
router.get("/receiveChats/userId=:userId/receiverId=:receiverId", receiveChats)

module.exports = router;