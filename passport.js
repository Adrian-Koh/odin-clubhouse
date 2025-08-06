const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const db = require("./db/queries");
const { validPassword } = require("./lib/passwordUtils");

const verifyCallback = (username, password, done) => {
  db.getUserByUsername(username)
    .then((user) => {
      if (!user) {
        return done(null, false);
      }

      const isValid = validPassword(password, user.passwordHash);
      if (isValid) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
    .catch((err) => {
      done(err);
    });
};

const strategy = new LocalStrategy(verifyCallback);
passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.userid);
});

passport.deserializeUser((userid, done) => {
  db.getUserByID(userid)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => done(err));
});
