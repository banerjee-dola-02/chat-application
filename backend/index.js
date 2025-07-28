// const express = require('express')// method-1
import express from "express"; // method-2
import dotenv from "dotenv"; 
import connectDB from "./config/database.js";
import userRoute from "./routes/userRoutes.js";
import messageRoute from "./routes/messageRoute.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import { app,server } from "./socket/socket.js";
dotenv.config({});

 
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json()); 
app.use(cookieParser());
const corsOption={
    origin: process.env.CORS_ORIGIN || "http://localhost:3000",
    credentials:true
};
app.use(cors(corsOption)); 


// routes
app.use("/api/v1/user",userRoute); 
app.use("/api/v1/message",messageRoute);
 

server.listen(PORT, ()=>{
    connectDB();
    console.log(`Server listen at port ${PORT}`);
});














// import express from "express";
// import dotenv from "dotenv"
// import connectDB from "./config/database.js";
// import userRoute from "./routes/userRoutes.js"; 
// import messageRoute from "./routes/messageRoute.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";


// dotenv.config({});

// const app=express();

// const PORT = process.env.PORT || 5000;

// //middleware
// app.use(express.urlencoded({extended:true}));
// app.use(express.json());
// app.use(cookieParser());
// const corsOption={
//     origin:'http://localhost:3000',
//     credentials:true
// };
// app.use(cors(corsOption));


// //routes
// app.use("/api/v1/user",userRoute);
// app.use("/api/v1/message",messageRoute);
// //http://localhost:8080/api/v1/user/register

// app.listen(PORT,  ()=>{
//     connectDB();
//     console.log(`Server listen at port ${PORT}`);
// }) 

//kal raat ko edited wala
// import express from "express";
// import dotenv from "dotenv";
// import connectDB from "./config/database.js";
// import userRoute from "./routes/userRoutes.js"; 
// import messageRoute from "./routes/messageRoute.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import { Server } from "socket.io";
// import http from "http"; // 👈 necessary for socket.io
// import initSocket from "./socket/socket.js"; // ✅ import socket file


// dotenv.config();

// const app = express();
// const server = http.createServer(app); // 👈 instead of app.listen

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000", // 👈 frontend origin
//     credentials: true
//   }
// });

// // middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({
//   origin: "http://localhost:3000",
//   credentials: true
// }));

// // routes
// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/message", messageRoute);


// // socket setup
// initSocket(io); // ✅ use socket

// // socket events
// io.on("connection", (socket) => {
//   console.log("⚡ A user connected:", socket.id);

//   socket.on("disconnect", () => {
//     console.log("❌ User disconnected:", socket.id);
//   });
// });

// const PORT = process.env.PORT || 8080;
// server.listen(PORT, () => {
//   connectDB();
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });


// index.js    //RECENT PREVIOuS    last commented
// import express from "express";
// import dotenv from "dotenv";
// import connectDB from "./config/database.js";
// import userRoute from "./routes/userRoutes.js";
// import messageRoute from "./routes/messageRoute.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import { Server } from "socket.io";
// import http from "http";
// import initSocket from "./socket/socket.js";


// dotenv.config();

// const app = express();
// const server = http.createServer(app); // ✅ socket compatible server

// const io = new Server(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     credentials: true,
//   },
// });


// // Socket handler
// initSocket(io);

// // middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({
//   origin: "http://localhost:3000",
//   credentials: true,
// }));

// // routes
// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/message", messageRoute);

// // ✅ init socket
// initSocket(io);

// const PORT = process.env.PORT || 8080;
// server.listen(PORT, () => {
//   connectDB();
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });




// import express from "express";
// import dotenv from "dotenv";
// import connectDB from "./config/database.js";
// import userRoute from "./routes/userRoutes.js";
// import messageRoute from "./routes/messageRoute.js";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import { server, initSocket } from "./socket/socket.js"; // ✅ import your socket file properly

// dotenv.config();

// const app = express();

// // middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(cookieParser());
// app.use(cors({
//   origin: "http://localhost:3000",
//   credentials: true
// }));

// // routes
// app.use("/api/v1/user", userRoute);
// app.use("/api/v1/message", messageRoute);

// // init socket
// initSocket(); // ✅ initialize socket events

// const PORT = process.env.PORT || 8080;
// server.listen(PORT, () => {
//   connectDB();
//   console.log(`🚀 Server running at http://localhost:${PORT}`);
// });
