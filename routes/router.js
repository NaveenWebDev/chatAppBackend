const express = require("express");
const router = express.Router();
const checkToken = require("../middleware/middleware")

const { signup, login } = require("../controllers/auth");
const {imageUpload} = require("../controllers/fileUpload")
const {
    getUserDataForChat, 
    getUserDataForChatById,
    createChat,
    receiveChats,
} = require("../controllers/chatController")

router.post("/signup", signup);
router.post("/login", login);

router.get("/getUserDataForChat/:userName", checkToken, getUserDataForChat)
router.get("/getUserDataForChatById/:id", checkToken, getUserDataForChatById)

router.post("/createChat", checkToken,  createChat)
router.get("/receiveChats/userId=:userId/receiverId=:receiverId", checkToken, receiveChats)
router.post("/imageUpload", checkToken, imageUpload)

module.exports = router;