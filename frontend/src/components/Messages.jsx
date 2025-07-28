

//*********************************** */
// import React from 'react';
// import Message from './Message';
// import useGetMessages from '../hooks/useGetMessages';
// import { useSelector } from 'react-redux';
// import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage';

// const Messages = () => {
//   useGetMessages();
//   useGetRealTimeMessage();

//   const { messages } = useSelector((store) => store.message);
//   const { authUser, selectedUser } = useSelector((store) => store.user);

//   if (!messages || !authUser || !selectedUser) return null;

//   // ✅ Filter only those messages between authUser and selectedUser
//   const filteredMessages = messages.filter(
//     (msg) =>
//       (msg.senderId === authUser._id && msg.receiverId === selectedUser._id) ||
//       (msg.senderId === selectedUser._id && msg.receiverId === authUser._id)
//   );

//   return (
//     <div className="px-4 flex-1 overflow-auto">
//       {filteredMessages.map((message) => (
//         <Message key={message._id} message={message} />
//       ))}
//     </div>
//   );
// };

// export default Messages;


import React from 'react';
import Message from './Message';
import useGetMessages from '../hooks/useGetMessages';
import { useSelector } from 'react-redux';
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage';

const Messages = () => {
  useGetMessages();
  useGetRealTimeMessage(); // Make sure this hook is updated to use the `addMessage` action

  const { selectedUser } = useSelector((store) => store.user);
  // ✅ Select the entire message cache from the store
  const { messages: messageCache } = useSelector((store) => store.message);

  // ✅ Get the messages for the currently selected user from the cache
  // Default to an empty array ([]) if no conversation history exists yet
  const currentMessages = selectedUser ? messageCache[selectedUser._id] || [] : [];

  // The .filter() logic is no longer needed because the new hook and state
  // structure already ensure you have the correct messages.

  return (
    <div className="px-4 flex-1 overflow-auto">
      {/* ✅ Map over the messages for the current conversation */}
      {currentMessages.length > 0 && currentMessages.map((message) => (
        <Message key={message._id} message={message} />
      ))}
    </div>
  );
};

export default Messages;








