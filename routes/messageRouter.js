const { Router } = require("express");
const messageRouter = Router();
const messageController = require("../controllers/messageController");
const { isAuthenticated } = require("../lib/authMiddleware");

messageRouter.get("/new", isAuthenticated, messageController.getNewMessageForm);
messageRouter.post("/new", messageController.postNewMessage);
messageRouter.get("/delete/:messageid", messageController.getDeleteMessage);

module.exports = messageRouter;
