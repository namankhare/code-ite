import { io } from 'socket.io-client';
import { API } from './backend';


let socket;

export const initiateSocketConnection = () => {
    // socket = io(API);
    console.log(`Connecting socket service...`);
}

export const disconnectSocket = () => {
    console.log('Disconnecting socket...');
    if (socket) socket.disconnect();
}

export const subscribeToRoom = (room, ranUser) => {
    socket.emit("join-room", room, ranUser); 
}

export const ifAdmin = async() => {
   let returnAdmin =  new Promise((resolve) =>{
        socket.on('admin',()=>{
            console.log("Admin initiated");
            resolve(true)
        })
   })
   return await returnAdmin
}

export const ifUserData = async() => {
    let returnUserData =  new Promise((resolve) =>{
         socket.on('userdata',(data)=>{
             resolve(data)
         })
    })
    return await returnUserData
}

export const ifResetData = async() => {
    let returnResetData =  new Promise((resolve) =>{
         socket.on('resetdata',(data)=>{
             resolve(data)
         })
    })
    return await returnResetData
}

export const emitKey = (data) => {
    socket.emit('key', data); 
}

export const onKey = async() => {
    console.log("onkey call")
    let returnOnKey =  new Promise((resolve) =>{
         socket.on('key',(data)=>{
             resolve(data)
         })
    })
    return await returnOnKey
}

export const onConnected = async() => {
    let returnOnConnected=  new Promise((resolve) =>{
         socket.on('connected',(data)=>{
             resolve(data)
         })
    })
    return await returnOnConnected
}