const db = require("../db/queries");
const {
  createPasswordHash,
  verifyClubhousePassword,
} = require("../lib/passwordUtils");
const { validationResult } = require("express-validator");

async function getHomepage(req, res) {
  const messages = await db.getAllMessages();
  const messagesWithTimes = messages.map((message) => {
    const datetime = `${new Date(
      message.added
    ).toLocaleDateString()}, ${new Date(message.added).toLocaleTimeString()}`;
    return { ...message, datetime };
  });

  res.render("index", {
    links: req.links,
    messages: messagesWithTimes,
    user: req.user,
  });
}

function getSignupForm(req, res) {
  res.render("signup", { links: req.links });
}

async function postSignUp(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(errors); // todo: error page
  }

  const { firstname, lastname, username, password, confirmPassword } = req.body;

  const passwordHash = await createPasswordHash(password);
  const user = {
    firstname,
    lastname,
    username,
    passwordHash,
    membership: "regular",
  };

  await db.insertUser(user);

  res.redirect("/login");
}

function getLoginForm(req, res) {
  res.render("login", { links: req.links });
}

function getJoinMemberForm(req, res) {
  res.render("join-member", { links: req.links });
}

async function postJoinMember(req, res) {
  const { secretPassword, isAdmin } = req.body;

  if (!verifyClubhousePassword(secretPassword)) {
    throw new Error(
      "Wrong secret password entered, you are rejected from the ex-communicado."
    );
  }

  const membership = isAdmin ? "admin" : "member";

  await db.updateUserMembership(req.user.userid, membership);

  res.redirect("/");
}

function logOut(req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}

function getFailureRedirect(req, res) {
  res.render("failure-redirect", { links: req.links });
}

module.exports = {
  getHomepage,
  getSignupForm,
  postSignUp,
  getLoginForm,
  getJoinMemberForm,
  postJoinMember,
  logOut,
  getFailureRedirect,
};
