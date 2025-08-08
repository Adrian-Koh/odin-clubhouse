const passport = require("passport");
const db = require("../db/queries");
const { validationResult } = require("express-validator");

function getNewMessageForm(req, res) {
  res.render("new-message", { links: req.links });
}

async function postNewMessage(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send(errors); // todo: error page
  }

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
