const server = require("./api/server");

const PORT = process.env.PORT || 5000;

server.get("/", (req, res) => {
  res.send("Sanity Check: You are safe, my friend");
});
server.listen(PORT, () => {
  console.log(`🔥  Server is live on ${PORT} 🔥`);
});
