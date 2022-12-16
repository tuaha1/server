const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const cors = require("cors");
app.use(cors());

const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("user connected: ", socket.id);
    socket.on("send message", (data) => {
        socket.broadcast.emit("receive message", data);
    })
})

server.listen(3001, function () {
    console.log("server started successfully");
})