//****************************************** */
// import React,{ useEffect }  from "react";
// import Sidebar from "./Sidebar";
// import MessageContainer from "./MessageContainer";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// const HomePage = () => {
//   const { authUser } = useSelector(store => store.user);
//   const navigate = useNavigate();
//   useEffect(() => {
//     if (!authUser) {
//       navigate("/login");
//     }
//   }, []);
//   return (
//     <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
//       <Sidebar />
//       <MessageContainer />
//     </div>
//   );
// };

// export default HomePage;





import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSocket } from '../context/SocketContext'; // 👈 Import useSocket
import { setOnlineUsers } from "../redux/userSlice";  // 👈 Import action

const HomePage = () => {
  const { authUser } = useSelector(store => store.user);
  const navigate = useNavigate();
  const socket = useSocket();   // 👈 Get socket from context
  const dispatch = useDispatch(); // 👈 Get dispatch function

  // This effect redirects to login if the user is not authenticated.
  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, [authUser, navigate]);

  // ✅ This new effect listens for online users from the socket.
  useEffect(() => {
    if (socket) {
      socket.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
      // Cleanup function to prevent memory leaks
      return () => socket.off("getOnlineUsers");
    }
  }, [socket, dispatch]);

  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default HomePage;