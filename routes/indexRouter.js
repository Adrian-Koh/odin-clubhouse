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
    failureRedirect: "/signup", // TODO: failure page
    successRedirect: "/",
  })
);
indexRouter.get("/join-member", indexController.getJoinMemberForm);
indexRouter.get("/new-message", indexController.getNewMessageForm);

module.exports = indexRouter;
