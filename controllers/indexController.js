const db = require("../db/queries");
const {
  createPasswordHash,
  verifyClubhousePassword,
} = require("../lib/passwordUtils");
const { links } = require("../lib/navLinks");

async function getHomepage(req, res) {
  const messages = await db.getAllMessages();
  res.render("index", {
    links,
    messages,
    user: req.user,
  });
}

function getSignupForm(req, res) {
  res.render("signup", { links });
}

async function postSignUp(req, res) {
  const { firstname, lastname, username, password, confirmPassword } = req.body;

  if (password !== confirmPassword) throw new Error("Passwords do not match!");

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
  res.render("login", { links });
}

function getJoinMemberForm(req, res) {
  res.render("join-member", { links });
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
  res.render("failure-redirect", { links });
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
