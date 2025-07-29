import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
         // ✅ Use the environment variable for the origin
        origin: process.env.CORS_ORIGIN,
        methods: ['GET', 'POST'],
    },
});

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId -> socketId}

io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId !== undefined) {
        userSocketMap[userId] = socket.id;
    }

    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    // ✅ NEW: private message handler
    socket.on('sendMessage', ({ senderId, receiverId, content }) => {
        const receiverSocketId = userSocketMap[receiverId];
        const message = {
            senderId,
            receiverId,
            content,
            createdAt: new Date(),
        };

        // ✅ emit only to receiver if online
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', message);
        }

        // ✅ (optional) also send back to sender to update their chat
        socket.emit('newMessage', message);
    });

    socket.on('disconnect', () => {
        delete userSocketMap[userId];
        io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
});

export { app, io, server };















