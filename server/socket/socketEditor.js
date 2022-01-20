var conId = 1 // Connection Id (auto increment, start at 1) 
var colors = [
    '#DDFFAA',
    '#95E0C8',
    '#E18060',
    '#FFCBA4'
] //highlight colors. 
var users = {}  //user datas 
/**
 * 
 * @param {SocketIO.Server} io SocketIO Server
 * @param {String} nsp NameSpace
 */
module.exports = function (io, nsp) {
    var server = io.of(nsp) //Set Namespace  
    server.on("connection", function (socket) {
        socket.on('join-room', function (roomId, ranUser) {
            socket.join(roomId);
            console.log("joined: ", roomId, ranUser)
            users[socket.id] = {}   //Create Users  
            users[socket.id].user = socket.user = ranUser
            users[socket.id].admin = socket.admin = true            //set admin  
            users[socket.id].color = socket.color = colors[conId % colors.length] //set highight colors  

            conId++ //UserId increment  
            console.log('[Socket.IO] [' + nsp + '] : Connect ' + socket.id) //print connect 

            if (server.adapter.rooms.get(roomId).size === 1) {    //if First Connect Client 
                socket.admin = true
                io.sockets.in(roomId).emit('admin');    //alert Admin  
                // socket.emit('admin');    //alert Admin  
                // socket.emit('userdata', Object.values(users));
                // import file data from database  
                // socket.emit('resetdata', data)
            }
            else {
                io.sockets.in(roomId).emit('userdata', Object.values(users))   //send Connected User data  
                // socket.emit('userdata', Object.values(users))   //send Connected User data  
            }
            socket.broadcast.to(roomId).emit('connected', { user: socket.user, color: socket.color }) //Alert New Connect  

            socket.on('selection', function (data) {       //Content Select Or Cursor Change Event
                data.color = socket.color
                data.user = socket.user
                socket.broadcast.to(roomId).emit('selection', data)
            })
            socket.on('filedata', function (data) {   //File Data Event  
                console.log("Asd", data)
                socket.broadcast.to(roomId).emit('resetdata', data)    //Give File Data  
            })
            socket.on('disconnect', function (data) {   //Client Disconnected
                console.log('[Socket.IO] [' + nsp + '] : disConnect ' + socket.id) //print disconnect
                socket.broadcast.to(roomId).emit("exit", users[socket.id].user);   //Alert Exit Connect
                delete users[socket.id] //delete from Server
                io.sockets.in(roomId).emit('userdata', Object.values(users))   //Alert Exit Connect
            })
            socket.on('key', function (data) {      //Change Content Event
                data.user = socket.user
                // console.log("key", data)
                socket.broadcast.to(roomId).emit('key', data)
            })
        })
    })
    return server
}


// io.sockets.in(roomId) - to broadcast including current current
// socket.broadcast.to(roomId) - to broadcast to client other than current

//refrence:https://github.com/tbvjaos510/monaco-editor-socket-io