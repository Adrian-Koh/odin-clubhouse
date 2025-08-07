function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("You are not authenticated to view this page.");
  }
}

function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.membership === "admin") {
    next();
  } else {
    res
      .status(401)
      .send(
        "You are not authorized to view this page as you are not an admin."
      );
  }
}

module.exports = { isAuthenticated, isAdmin };
