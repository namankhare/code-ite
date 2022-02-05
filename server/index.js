const express = require("express");
const cors = require("cors");
const app = express();
const server = require("http").Server(app);
const cookieParser = require("cookie-parser");
const pool = require("./config/db");
//env file
require("dotenv").config();

pool.getConnection((err, conn) => {
  if (err) {
    console.log("connection error", err);
  } else {
    console.log("connected to db");
  }
});

//cors and parser
app.use(cors("*"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const useRouter = require("./router");
app.use("/", useRouter);

//socket yaha hai
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
  pingTimeout: 60000,
  upgradeTimeout: 30000,
});
require("./socket/socketEditor")(io, "/");

server.listen(process.env.PORT || 5001, () => {
  console.log(`http://localhost:${process.env.PORT || 5001}`);
});
