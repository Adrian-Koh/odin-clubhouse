const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  userid INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  firstname VARCHAR (255),
  lastname VARCHAR (255),
  username VARCHAR (255),
  passwordHash VARCHAR (255),
  membership VARCHAR (255)
);

INSERT INTO users (firstname, lastname, username, passwordHash, membership)
VALUES 
('John', 'Smith', 'johnsmith123', '12345', 'member');

CREATE TABLE IF NOT EXISTS messages (
  messageid INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  added TIMESTAMP,
  text VARCHAR (500),
  userid INTEGER,
  FOREIGN KEY (userid) REFERENCES users(userid)
);

INSERT INTO messages (added, text, userid)
VALUES 
(CURRENT_TIMESTAMP, 'I bet you cannot guess who I am!', 1);
`;

// lesson learned: important to add newline after VALUES

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
