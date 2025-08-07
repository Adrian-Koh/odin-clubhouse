require("dotenv").config();
const bcrypt = require("bcryptjs");
const SALT = 10;

async function validPassword(enteredPassword, correctPasswordHash) {
  return await bcrypt.compare(enteredPassword, correctPasswordHash);
}

async function createPasswordHash(password) {
  return await bcrypt.hash(password, SALT);
}

function verifyClubhousePassword(password) {
  return password === process.env.CLUBHOUSE_PASSWORD;
}

module.exports = { validPassword, createPasswordHash, verifyClubhousePassword };
