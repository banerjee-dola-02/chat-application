// ********************************8
//import React, { useEffect, useState } from "react";
// import "./index.css";
// import "./App.css";
// import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import Signup from "./components/Signup";
// import HomePage from "./components/HomePage";
// import Login from "./components/Login";
// import { useDispatch, useSelector } from "react-redux";
// import io from "socket.io-client";
// import { setOnlineUsers } from "./redux/userSlice";
// import { setSocket } from "./redux/socketSlice";


// const router = createBrowserRouter([
//   { path: "/", element: <HomePage /> },
//   { path: "/register", element: <Signup /> },
//   { path: "/login", element: <Login /> },
// ]);

// function App() {
//   const { authUser } = useSelector(store => store.user);
//   const { socket } = useSelector(store=>store.socket);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (authUser) {
//       const socketio = io("http://localhost:8080", {
//         query: {
//           userId: authUser._id
//         }
//       });
//       dispatch(setSocket(socketio));

//       socketio.on("getOnlineUsers", (onlineUsers) => {
//         dispatch(setOnlineUsers(onlineUsers));
//       });
//       return () => socketio.close();
//     } else {
//       if (socket) {
//         socket.close();
//         dispatch(setSocket(null));
//       }
//     }
//   }, [authUser]);

//   return (
//     <div className="p-4 h-screen flex items-center justify-center">
//       <RouterProvider router={router} />
//     </div>
//   );
// }

// export default App;

import React from "react";
import "./index.css";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "./components/Signup";
import HomePage from "./components/HomePage";
import Login from "./components/Login";

// The router setup is fine, no changes needed here.
const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/register", element: <Signup /> },
  { path: "/login", element: <Login /> },
]);

function App() {
  // All the old socket logic has been removed from here.
  // This component's only job is to render the router.
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;