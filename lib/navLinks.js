const links = [];
links.push({ href: "/", title: "Home" });
links.push({ href: "/signup", title: "Sign Up" });
links.push({ href: "/login", title: "Log In" });
links.push({ href: "/join-member", title: "Be a member" });
links.push({ href: "/message/new", title: "New message" });
links.push({ href: "/logout", title: "Log out" });

const dummyMessages = [];
dummyMessages.push({ user: "user1", text: "hello" });
dummyMessages.push({ user: "user2", text: "sup" });

module.exports = { links, dummyMessages };
