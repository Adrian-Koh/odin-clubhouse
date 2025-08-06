const bcrypt = require("bcryptjs");
const SALT = 10;

async function validPassword(enteredPassword, correctPasswordHash) {
  return await bcrypt.compare(enteredPassword, correctPasswordHash);
}

async function createPasswordHash(password) {
  return await bcrypt.hash(password, SALT);
}

module.exports = { validPassword, createPasswordHash };
