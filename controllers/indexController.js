const passport = require("passport");
const db = require("../db/queries");
const { createPasswordHash } = require("../lib/passwordUtils");

const links = [];
links.push({ href: "/", title: "Home" });
links.push({ href: "/signup", title: "Sign Up" });
links.push({ href: "/login", title: "Log In" });
links.push({ href: "/join-member", title: "Be a member" });
links.push({ href: "/new-message", title: "New message" });

const dummyMessages = [];
dummyMessages.push({ user: "user1", text: "hello" });
dummyMessages.push({ user: "user2", text: "sup" });

function getHomepage(req, res) {
  res.render("index", { links, messages: dummyMessages, isMember: false });
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

function postLogin(req, res) {
  passport.authenticate("local", {
    failureRedirect: "/signup",
    successRedirect: "/",
  });
}

function getJoinMemberForm(req, res) {
  res.render("join-member", { links });
}

function getNewMessageForm(req, res) {
  res.render("new-message", { links });
}

module.exports = {
  getHomepage,
  getSignupForm,
  postSignUp,
  getLoginForm,
  postLogin,
  getJoinMemberForm,
  getNewMessageForm,
};
