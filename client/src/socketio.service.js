import { io } from 'socket.io-client';
import { API } from './backend';

let socket;

export const initiateSocketConnection = () => {
    socket = io(API);
    console.log(`Connecting socket...`);
}

export const disconnectSocket = () => {
    console.log('Disconnecting socket...');
    if (socket) socket.disconnect();
}

export const subscribeToChat = (cb) => {
    socket.emit("join-room", '1', 'nk');

}
export const sendSync = (cb) => {
    // console.log(cb)
    socket.emit('message', cb);
}
export const recieveSync = (cb) => {
    // console.log(cb)
    socket.on('createMessage', msg => {
        return cb(null, msg);
    });
}