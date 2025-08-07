const passport = require("passport");
const db = require("../db/queries");
const { createPasswordHash } = require("../lib/passwordUtils");

const links = [];
links.push({ href: "/", title: "Home" });
links.push({ href: "/signup", title: "Sign Up" });
links.push({ href: "/login", title: "Log In" });
links.push({ href: "/join-member", title: "Be a member" });
links.push({ href: "/new-message", title: "New message" });
links.push({ href: "/logout", title: "Log out" });

const dummyMessages = [];
dummyMessages.push({ user: "user1", text: "hello" });
dummyMessages.push({ user: "user2", text: "sup" });

function getHomepage(req, res) {
  res.render("index", {
    links,
    messages: dummyMessages,
    isMember: false,
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

function getNewMessageForm(req, res) {
  res.render("new-message", { links });
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
  getNewMessageForm,
  logOut,
  getFailureRedirect,
};
