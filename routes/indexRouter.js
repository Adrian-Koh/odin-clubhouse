const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");

indexRouter.get("/", indexController.getHomepage);
indexRouter.get("/signup", indexController.getSignupForm);
indexRouter.get("/login", indexController.getLoginForm);
indexRouter.get("/join-member", indexController.getJoinMemberForm);
indexRouter.get("/new-message", indexController.getNewMessageForm);

module.exports = indexRouter;
