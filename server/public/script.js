const socket = io("/");
let messages = document.querySelector(".messages");
let text = document.querySelector("#codeEditor");
let send = document.getElementById("send");


text.addEventListener("keyup", (e) => {
  if (text.value.length !== 0) {
    socket.send(text.value)
  }
})

// send.addEventListener("click", (e) => {
//   if (text.value.length !== 0) {
//     socket.emit("message", text.value);
//     text.value = "";
//   }
// });


const user = prompt("Enter your name");

var peer = new Peer(undefined, {
  path: "/peerjs",
  host: "/",
  port: "5000",
});

peer.on("open", (id) => {
  socket.emit("join-room", ROOM_ID, id, user);
});

socket.on("createMessage", (message, userName) => {
  text.value = message
  // messages.innerHTML =
  //   messages.innerHTML +
  //   `<div class="message">
  //         <b><i class="far fa-user-circle"></i> <span> ${userName === user ? "me" : userName
  //   }</span> </b>
  //         <span>${message}</span>
  //     </div>`;
});
