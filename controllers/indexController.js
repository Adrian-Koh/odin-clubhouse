const links = [];
links.push({ href: "/", title: "Home" });
links.push({ href: "/signup", title: "Sign Up" });
links.push({ href: "/login", title: "Log In" });
links.push({ href: "/join-member", title: "Be a member" });
links.push({ href: "/new-message", title: "New message" });

const dummyMessages = [];
dummyMessages.push({ user: "user1", text: "hello" });
dummyMessages.push({ user: "user2", text: "sup" });

function getHomepage(req, res) {
  res.render("index", { links, messages: dummyMessages, isMember: false });
}

module.exports = { getHomepage };
