const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");
const passport = require("passport");
const { isAuthenticated } = require("../lib/authMiddleware");
const { validateSignup } = require("../lib/formValidator");
const { getLinks } = require("../lib/navLinks");

indexRouter.get("/", getLinks, indexController.getHomepage);
indexRouter.get("/signup", getLinks, indexController.getSignupForm);
indexRouter.post("/signup", validateSignup, indexController.postSignUp);
indexRouter.get("/login", getLinks, indexController.getLoginForm);
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
  getLinks,
  indexController.getJoinMemberForm
);
indexRouter.post(
  "/join-member",
  isAuthenticated,
  indexController.postJoinMember
);
indexRouter.get("/logout", indexController.logOut);
indexRouter.get("/failure-redirect", indexController.getFailureRedirect);

module.exports = indexRouter;
