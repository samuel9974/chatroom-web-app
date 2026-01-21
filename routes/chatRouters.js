const express = require("express");
const chatController = require("../controllers/chatController");

const router = express.Router();

router.get("/", chatController.showChatroom);
router.post("/messages", chatController.createMessage);
router.get("/messages", chatController.getMessages);
router.delete("/messages/:id", chatController.deleteMessage);
router.put("/messages/:id", chatController.editMessage);
router.get("/search", chatController.searchMessages);

module.exports = router;