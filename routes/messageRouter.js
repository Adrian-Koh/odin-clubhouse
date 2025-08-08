const { Router } = require("express");
const messageRouter = Router();
const messageController = require("../controllers/messageController");
const { isAuthenticated, isAdmin } = require("../lib/authMiddleware");
const { getLinks } = require("../lib/navLinks");

messageRouter.get(
  "/new",
  isAuthenticated,
  getLinks,
  messageController.getNewMessageForm
);
messageRouter.post("/new", isAuthenticated, messageController.postNewMessage);
messageRouter.get(
  "/delete/:messageid",
  isAdmin,
  messageController.getDeleteMessage
);

module.exports = messageRouter;
