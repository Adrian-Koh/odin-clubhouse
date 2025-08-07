const { Router } = require("express");
const messageRouter = Router();
const messageController = require("../controllers/messageController");
const { isAuthenticated, isAdmin } = require("../lib/authMiddleware");

messageRouter.get("/new", isAuthenticated, messageController.getNewMessageForm);
messageRouter.post("/new", isAuthenticated, messageController.postNewMessage);
messageRouter.get(
  "/delete/:messageid",
  isAdmin,
  messageController.getDeleteMessage
);

module.exports = messageRouter;
