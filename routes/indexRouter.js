const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");
const passport = require("passport");

indexRouter.get("/", indexController.getHomepage);
indexRouter.get("/signup", indexController.getSignupForm);
indexRouter.post("/signup", indexController.postSignUp);
indexRouter.get("/login", indexController.getLoginForm);
indexRouter.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/failure-redirect", // TODO: failure page
    successRedirect: "/",
  })
);
indexRouter.get("/join-member", indexController.getJoinMemberForm);
indexRouter.get("/new-message", indexController.getNewMessageForm);
indexRouter.get("/logout", indexController.logOut);
indexRouter.get("/failure-redirect", indexController.getFailureRedirect);

module.exports = indexRouter;
