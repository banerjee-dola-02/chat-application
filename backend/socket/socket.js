import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000'],
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



// import {Server} from "socket.io";
// import http from "http";
// import express from "express";

// const app = express();

// const server = http.createServer(app);
// const io = new Server(server, {
//     cors:{
//         origin:['http://localhost:3000'],
//         methods:['GET', 'POST'],
//     },
// });

// export const getReceiverSocketId = (receiverId) => {
//     return userSocketMap[receiverId];
// }

// const userSocketMap = {}; // {userId->socketId}


// io.on('connection', (socket)=>{
//     const userId = socket.handshake.query.userId
//     if(userId !== undefined){
//         userSocketMap[userId] = socket.id;
//     } 

//     io.emit('getOnlineUsers',Object.keys(userSocketMap));

//     socket.on('disconnect', ()=>{
//         delete userSocketMap[userId];
//         io.emit('getOnlineUsers',Object.keys(userSocketMap));
//     })

// })

// export {app, io, server};







// import {Server} from "socket.io";
// import http from "http";
// import express from "express";
// import dotenv from "dotenv";
// dotenv.config();

// const app=express();

// const server=http.createServer(app);
// const io=new Server(server, {
//     cors:{
//         origin:["http://localhost:3000"],
//         methods:['GET','POST'],
//     },
// });
// io.on('connection', (socket)=>{
//     console.log('user connected',socket.id);
// });

// server.listen(8000, () => {
//   console.log("Server running on http://localhost:8000"); // ✅ correct
// });

// export {app,io,server};

// import { Server } from "socket.io";
// import http from "http";
// import express from "express";
// import dotenv from "dotenv";

// dotenv.config();

// const app = express();
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:3000"],
//     methods: ["GET", "POST"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log("user connected", socket.id);
// });

// server.listen(process.env.PORT || 8080, () => {
//   console.log("Server listen at port", process.env.PORT || 8080);
// });


// backend/socket/socket.js
// import { Server } from "socket.io";

// let io;

// export const initSocket = (server) => {
//   io = new Server(server, {
//     cors: {
//       origin: "http://localhost:3000",
//       methods: ["GET", "POST"],
//     },
//   });

//   const userSocketMap={};    //{userId->socketId}

//   io.on("connection", (socket) => {
//     console.log("✅ User connected:", socket.id);

//     socket.on("disconnect", () => {
//       console.log("❌ User disconnected:", socket.id);

      
//     });
//   });

//   return io;
// };

// export const getIO = () => {
//   if (!io) {
//     throw new Error("Socket.io not initialized!");
//   }
//   return io;
// };


///RECENT  previos     commented last
// import {Server} from "socket.io";
// import http from "http";
// import express from "express";

// const app=express();
// const server=http.createServer(app);

// const io = new Server(server, {
//     cors:{
//         origin:['http://localhost:3000'],
//         methods:['GET', 'POST'],
//     },
// });

// const userSocketMap = {};   //{userId->socketId}


// export const getReceiverSocketId= (receiverId) => {
//   return userSocketMap[receiverId];
// }




// socket.js    
// const initSocket = (io) => {
//   io.on('connection', (socket) => {
//     console.log('⚡ A user connected:', socket.id);

//       const userId=socket.handshake.query.userId
//       if(userId !== undefined){
//         userSocketMap[userId]=socket.id;
//       }

//       io.emit('getOnlineUsers',Object.keys(userSocketMap));


//       socket.on("disconnect", () => {
//         console.log("❌ User disconnected:", socket.id);
//         delete userSocketMap[userId];
//         io.emit('getOnlineUsers',Object.keys(userSocketMap));

//     });
//   });
// };

// export default initSocket;

// export {app,io,server};



