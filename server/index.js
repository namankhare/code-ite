const express = require('express')
const app = express()
var cors = require('cors')
const useRouter = require("./route")
const server = require("http").Server(app);
// //yaha
// var Y = require('yjs')

// var minimist = require('minimist')
// require('y-memory')(Y)
// try {
//   require('y-leveldb')(Y)
// } catch (err) { }
// require('y-websockets-server')(Y)
// // try {
// //   // try to require local y-websockets-server
// //   // require('./y-websockets-server.js')(Y)
// // } catch (err) {
// //   // otherwise require global y-websockets-server

// // }

// var options = minimist(process.argv.slice(2), {
//   string: ['port', 'debug', 'db'],
//   default: {
//     port: process.env.PORT || '1234',
//     // port: server,
//     debug: false,
//     db: 'memory'
//   }
// })
// var port = Number.parseInt(options.port, 10)
// // var io = require('socket.io')(port)


//khatm
app.use(cors('*'))
app.use(express.json());

//set view engine
app.set("view engine", "ejs");


const io = require("socket.io")(server, {
  cors: {
    origin: '*'
  }
});

function getInstanceOfY(room) {
  if (global.yInstances[room] == null) {
    global.yInstances[room] = Y({
      db: {
        name: options.db,
        dir: 'y-leveldb-databases',
        namespace: room
      },
      connector: {
        name: 'websockets-server',
        room: room,
        io: io,
        debug: !!options.debug
      },
      share: {}
    })
  }
  return global.yInstances[room]
}


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

