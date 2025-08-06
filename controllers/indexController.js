const links = [];
links.push({ href: "/", title: "Home" });
links.push({ href: "/signup", title: "Sign Up" });
links.push({ href: "/login", title: "Log In" });
links.push({ href: "/join-member", title: "Be a member" });
links.push({ href: "/new-message", title: "New message" });

function getHomepage(req, res) {
  res.render("index", { links });
}

module.exports = { getHomepage };
