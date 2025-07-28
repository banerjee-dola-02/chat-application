
//*************************************** */
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setMessages } from "../redux/messageSlice";

// const useGetRealTimeMessage = () => {
//   const { socket } = useSelector(store => store.socket);
//   const { messages } = useSelector(store => store.message);
//   const { authUser, selectedUser } = useSelector(store => store.user);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const handleNewMessage = (newMessage) => {
//       // ✅ Only show the message if it's from/to the currently open user
//       const from = newMessage.senderId;
//       const to = newMessage.receiverId;
//       const selectedId = selectedUser?._id;

//       const isRelevant =
//         (from === selectedId && to === authUser._id) ||
//         (from === authUser._id && to === selectedId);

//       if (isRelevant) {
//         const safeMessages = Array.isArray(messages) ? messages : [];
//         dispatch(setMessages([...safeMessages, newMessage]));
//       }
//     };

//     socket?.on("newMessage", handleNewMessage);

//     return () => socket?.off("newMessage", handleNewMessage);
//   }, [socket, messages, dispatch, selectedUser, authUser]);
// };

// export default useGetRealTimeMessage;




import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../redux/messageSlice";
import { useSocket } from '../context/SocketContext';

const useGetRealTimeMessage = () => {
  const dispatch = useDispatch();
  const socket = useSocket();
  // Get the current authenticated user from the store
  const { authUser } = useSelector(store => store.user);

  useEffect(() => {
    if (socket) {
      const handleNewMessage = (newMessage) => {
        // Determine the correct conversation ID
        let conversationId;

        // If I am the sender, the conversation is with the receiver
        if (newMessage.senderId === authUser._id) {
          conversationId = newMessage.receiverId;
        } else {
          // If I am the receiver, the conversation is with the sender
          conversationId = newMessage.senderId;
        }
        
        // Dispatch the action to add the new message to the correct cache
        dispatch(addMessage({ conversationId, message: newMessage }));
      };

      socket.on("newMessage", handleNewMessage);

      return () => {
        socket.off("newMessage", handleNewMessage);
      };
    }
  }, [socket, dispatch, authUser]); // Add authUser to the dependency array
};

export default useGetRealTimeMessage;





