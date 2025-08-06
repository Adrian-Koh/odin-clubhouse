const path = require("node:path");
require("dotenv").config();
const express = require("express");
const pg = require("pg");
const expressSession = require("express-session");
const pgSession = require("connect-pg-simple")(expressSession);
const app = express();
//const indexRouter = require("./routes/indexRouter");

const pgPool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});
console.log(process.env.DATABASE_URL);

app.use(
  expressSession({
    store: new pgSession({
      pool: pgPool,
      tableName: "clubhouse_sessions",
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
//app.use("/", indexRouter);
app.get("/", (req, res) => res.send("welcome!"));

// app.use((err, req, res, next) => {
//   res.status(500);
//   res.send(err);
//   //res.render("error", { error: err });
// });

const PORT = 8000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));
