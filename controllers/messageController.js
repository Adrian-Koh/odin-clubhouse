const passport = require("passport");
const db = require("../db/queries");
const { links } = require("../lib/navLinks");

function getNewMessageForm(req, res) {
  res.render("new-message", { links });
}

async function postNewMessage(req, res) {
  const { message } = req.body;

  await db.insertMessage(message, req.user.userid);
  res.redirect("/");
}

async function getDeleteMessage(req, res) {
  const { messageid } = req.params;
  await db.deleteMessage(messageid);
  res.redirect("/");
}

module.exports = {
  getNewMessageForm,
  postNewMessage,
  getDeleteMessage,
};
