const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");
const passport = require("passport");
const { isAuthenticated } = require("../lib/authMiddleware");

indexRouter.get("/", indexController.getHomepage);
indexRouter.get("/signup", indexController.getSignupForm);
indexRouter.post("/signup", indexController.postSignUp);
indexRouter.get("/login", indexController.getLoginForm);
indexRouter.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/failure-redirect",
    successRedirect: "/",
  })
);
indexRouter.get(
  "/join-member",
  isAuthenticated,
  indexController.getJoinMemberForm
);
indexRouter.post(
  "/join-member",
  isAuthenticated,
  indexController.postJoinMember
);
indexRouter.get(
  "/new-message",
  isAuthenticated,
  indexController.getNewMessageForm
);
indexRouter.get("/logout", indexController.logOut);
indexRouter.get("/failure-redirect", indexController.getFailureRedirect);

module.exports = indexRouter;
