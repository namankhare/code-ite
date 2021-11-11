const express = require('express')
const app = express()
const useRouter = require("./route")
const server = require("http").Server(app);

app.set("view engine", "ejs");


const io = require("socket.io")(server, {
  cors: {
    origin: '*'
  }
});

const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true,
});

app.use("/peerjs", peerServer);

app.use(express.static("public"));

app.use("/", useRouter)
app.use("/room", useRouter)


io.on("connection", (socket) => {

  socket.on("join-room", (roomId, userId, userName) => {
    console.log("roomid", roomId)
    socket.join(roomId);
    // socket.to(roomId).broadcast.emit("user-connected", userId);
    socket.broadcast.to(roomId).emit('user-connected', userId);
    socket.on("message", (message) => {
      io.to(roomId).emit("createMessage", message, userName);
    });
  });
});



server.listen(process.env.PORT || 5000);
console.log(`http://localhost:5000`)

