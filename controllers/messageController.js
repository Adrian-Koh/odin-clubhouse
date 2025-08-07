const passport = require("passport");
const db = require("../db/queries");
const { links, dummyMessages } = require("../lib/navLinks");

function getNewMessageForm(req, res) {
  res.render("new-message", { links });
}

async function postNewMessage(req, res) {}

async function getDeleteMessage(req, res) {}

module.exports = {
  getNewMessageForm,
  postNewMessage,
  getDeleteMessage,
};
