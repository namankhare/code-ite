const express = require('express')
const app = express()
var cors = require('cors')
const useRouter = require("./route")
const server = require("http").Server(app);

app.use(cors('*'))
app.use(express.json());

//set view engine
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
  console.log(`I'm connected with the back-end from backedn`);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
  socket.on("join-room", (roomId, userId) => {
    console.log("roomid", roomId, userId)
    socket.join(roomId);
    // socket.to(roomId).broadcast.emit("user-connected", userId);
    socket.broadcast.to(roomId).emit('user-connected', userId);

    socket.on("message", (message) => {
      io.to(roomId).emit("createMessage", message);
    });
  });
});



server.listen(process.env.PORT || 5000);
console.log(`http://localhost:5000`)

