const { Pool } = require("pg");

module.export = new Pool({
  connectionString: process.env.DATABASE_URL,
});
