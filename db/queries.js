const pool = require("./pool");

async function insertUser(user) {
  await pool.query(
    `INSERT INTO users 
    (firstname, lastname, username, passwordhash, membership) 
    VALUES 
    ($1, $2, $3, $4, $5)`,
    [
      user.firstname,
      user.lastname,
      user.username,
      user.passwordHash,
      user.membership,
    ]
  );
}

async function insertMessage(message) {
  await pool.query(
    `INSERT INTO messages (added, text, userid)
        VALUES
        (CURRENT_TIMESTAMP, $1, $2)`,
    [message.text, message.userid]
  );
}

async function getUserByUsername(username) {
  const { rows } = await pool.query(`SELECT * FROM users WHERE username=$1`, [
    username,
  ]);
  console.log(rows);

  return rows[0];
}

async function getUserByID(userid) {
  const { rows } = await pool.query(`SELECT * FROM users WHERE userid=$1`, [
    userid,
  ]);
  return rows[0];
}

async function updateUserMembership(userid, membership) {
  await pool.query("UPDATE users SET membership=$1 WHERE userid=$2", [
    membership,
    userid,
  ]);
}

async function getAllMessages() {
  const { rows } = await pool.query(
    "SELECT * FROM messages LEFT JOIN users ON messages.userid = users.userid"
  );
  return rows;
}

async function getUserMessages(userid) {
  const { rows } = await pool.query(
    `SELECT * FROM messages WHERE messages.userid=$1`,
    [userid]
  );
  return rows;
}

async function insertMessage(message, userid) {
  await pool.query(
    "INSERT INTO messages (added, text, userid) VALUES (CURRENT_TIMESTAMP, $1, $2)",
    [message, userid]
  );
}

async function deleteMessage(messageid) {
  await pool.query("DELETE FROM messages WHERE messages.messageid=$1", [
    messageid,
  ]);
}

module.exports = {
  insertUser,
  insertMessage,
  getUserByUsername,
  getUserByID,
  updateUserMembership,
  getAllMessages,
  getUserMessages,
  insertMessage,
  deleteMessage,
};
