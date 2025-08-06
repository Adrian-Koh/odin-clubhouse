const { Router } = require("express");
const indexRouter = Router();
const indexController = require("../controllers/indexController");

indexRouter.get("/", indexController.getHomepage);
indexRouter.get("/signup", (req, res) => res.send("sign up form"));
indexRouter.get("/login", (req, res) => res.send("log in form"));
indexRouter.get("/join-member", (req, res) => res.send("join member form"));
indexRouter.get("/new-message", (req, res) => res.send("new message form"));

module.exports = indexRouter;
