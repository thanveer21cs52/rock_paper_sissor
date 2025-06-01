require('dotenv').config(); // Load .env variables at the top

const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

const joinarr = [];
const movearr = [];
const playerlog = [];

const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || "*"; // fallback for testing

// CORS setup
app.use(cors({
    origin: FRONTEND_URL,
    methods: ["GET", "POST"]
}));

// Basic test route to avoid "Cannot GET /"
app.get("/", (req, res) => {
    res.send("🎮 Rock-Paper-Scissors Socket Server is running.");
});

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: FRONTEND_URL,
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log(`🟢 User connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        if (joinarr.length <= 2) {
            socket.join(data.room);
            if (joinarr.length === 0) {
                joinarr.push(data);
            } else if (joinarr.length === 1 && data.room === joinarr[0].room) {
                joinarr.push(data);
                const roomdetail = {
                    user1: joinarr[0].name,
                    user2: joinarr[1].name,
                    room: joinarr[0].room,
                    roomfull: true
                };
                io.in(data.room).emit("room_details", roomdetail);
                playerlog.push(roomdetail);
                joinarr.splice(0, 2);
            }
        }
    });

    socket.on("message_sent", (data) => {
        if (movearr.length === 0) {
            movearr.push(data);
            socket.to(data.room).emit("receive_message", { data, shake: false });
        } else if (movearr.length === 1) {
            movearr.push(data);
            socket.to(data.room).emit("receive_message", { data, shake: false });
            if (movearr.length === 2) {
                console.log("Moves:", movearr);
                io.in(data.room).emit("start_game", { shake: true });
                movearr.splice(0, 2);
            }
        }
    });

    socket.on("disconnect", () => {
        console.log(`🔴 User disconnected: ${socket.id}`);
    });
});

server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
