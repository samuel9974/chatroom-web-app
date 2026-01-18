const express = require("express");
const chatController = require("../controllers/chatController");

const router = express.Router();

router.get("/", chatController.showChatroom);
router.post("/messages", chatController.createMessage);
router.get("/messages", chatController.getMessages);

module.exports = router;