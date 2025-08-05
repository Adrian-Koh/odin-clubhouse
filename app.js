const path = require("node:path");
const session = require("express-session");
require("dotenv").config();
const express = require("express");
const app = express();
const indexRouter = require("./routes/indexRouter");

app.use(express.static(path.join(__dirname, "public")));
app.use("/", indexRouter);

app.use((err, req, res, next) => {
  res.status(500);
  res.render("error", { error: err });
});

const PORT = 8000;
app.listen(PORT, () => console.log(`Listening on port ${PORT}.`));
