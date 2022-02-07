var conId = 1; // Connection Id
var colors = ["#DDFFAA", "#95E0C8", "#E18060", "#FFCBA4"]; //highlight colors.
var users = {}; //user datas

module.exports = (io) => {
    io.on("connection", (socket) => {
        socket.on("join-room", (roomId, ranUser) => {
            socket.join(roomId);
            console.log("joined: ", roomId, ranUser);
            users[socket.id] = {}; //Create Users
            users[socket.id].user = socket.user = ranUser;
            users[socket.id].admin = socket.admin = true; //set admin
            users[socket.id].color = socket.color = colors[conId % colors.length]; //set highight colors

            conId++; //UserId increment
            console.log(io.sockets.adapter.rooms.get(roomId).size)
            if (io.sockets.adapter.rooms.get(roomId).size === 1) {
                //if First Connect Client
                socket.admin = true;
                io.sockets.in(roomId).emit("admin");
            } else {
                io.sockets.in(roomId).emit("userdata", Object.values(users)); //send Connected User data
            }
            socket.broadcast
                .to(roomId)
                .emit("connected", { user: socket.user, color: socket.color });

            socket.on("filedata", (data) => {
                //File Data Event
                socket.broadcast.to(roomId).emit("resetdata", data); //Give File Data
            });
            socket.on('whiteboard', (data) => {
                socket.broadcast.to(roomId).emit('whiteboard', data);
            });
            socket.on("key", (data) => {
                //Change Content Event
                data.user = socket.user;
                socket.broadcast.to(roomId).emit("key", data);
            });
            socket.on('disconnect', (data) => {   //Client Disconnected
                socket.broadcast.to(roomId).emit("exit", ranUser);   //Alert Exit Connect
                delete users[socket.id] //delete from Server
                io.sockets.in(roomId).emit("userdata", Object.values(users)); //Alert Exit Connect
            })
        });
    });
}