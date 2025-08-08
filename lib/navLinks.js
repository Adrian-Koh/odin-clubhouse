function getLinks(req, res, next) {
  const links = [];
  links.push({ href: "/", title: "Home" });
  if (req.isAuthenticated()) {
    links.push({ href: "/message/new", title: "New message" });
    links.push({ href: "/logout", title: "Log out" });
    if (req.user.membership !== "admin") {
      links.push({ href: "/join-member", title: "Be a member" });
    }
  } else {
    links.push({ href: "/signup", title: "Sign Up" });
    links.push({ href: "/login", title: "Log In" });
  }
  req.links = links;
  next();
}

module.exports = { getLinks };
