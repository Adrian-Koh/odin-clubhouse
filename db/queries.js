const pool = require("./pool");

async function insertUser(user) {
  await pool.query(
    `INSERT INTO users (firstname, lastname, username, passwordHash, membership)
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

async function getUser(username) {
  const { rows } = await pool.query(`SELECT * FROM users WHERE username=$1`, [
    username,
  ]);
  return rows[0];
}

async function getUserMessages(userid) {
  const { rows } = await pool.query(
    `SELECT * FROM messages WHERE messages.userid=$1`,
    [userid]
  );
  return rows;
}

module.exports = { insertUser, insertMessage, getUser, getUserMessages };
