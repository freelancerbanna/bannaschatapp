const express = require("express");
const http = require("http");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const fs = require("fs");
const morgan = require("morgan");
const { Server } = require("socket.io");
require("dotenv").config();

// @service    connection
// @name       database
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB connected"))
  .catch((err) => console.log(err));

// @service    connection
// @name       socket
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.SOCKET_ORIGIN,
    credentials: true,
  },
});

// @service    middleware
// @name       all
app.use(cors());
app.use(express.json());
app.use(morgan("common"));

// @service    main route
// @name       api
fs.readdirSync("./routes").map((r) =>
  app.use("/api", require(`./routes/${r}`))
);

// @service    listening
// @name       server port
server.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}`);
});

// @service    event running
// @name       socket
global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  // adding onlie users to socket
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });
  // seraching online from socket and sending specific user
  socket.on("send-msg", (data) => {
    const sendUserSocketId = onlineUsers.get(data.to);
    if (sendUserSocketId) {
      socket.to(sendUserSocketId).emit("receive-msg", data.message);
    }
  });
});
