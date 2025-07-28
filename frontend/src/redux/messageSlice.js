// import { createSlice } from "@reduxjs/toolkit";

// const messageSlice = createSlice({
//     name:"message",

//     initialState:{
//         //messages:null,
//          messages: [],
//     },
//     reducers:{
//         setMessages:(state,action)=>{
//             state.messages = action.payload;
//         }
//     }
// });
// export const {setMessages}=messageSlice.actions;
// export default messageSlice.reducer;




//***************************** */
// import { createSlice } from '@reduxjs/toolkit';

// const messageSlice = createSlice({
//   name: 'message',
//   // ✅ Make sure the initial state for messages is an empty array
//   initialState: {
//     messages: [], 
//   },
//   reducers: {
//     setMessages: (state, action) => {
//       // Also ensure the payload you're setting is an array
//       if (Array.isArray(action.payload)) {
//         state.messages = action.payload;
//       }
//     },
//     //... other reducers
//   },
// });

// export const { setMessages } = messageSlice.actions;
// export default messageSlice.reducer;



import { createSlice } from '@reduxjs/toolkit';

const messageSlice = createSlice({
  name: 'message',
  initialState: {
    // ✅ Store messages in an object to cache different conversations
    messages: {}, 
  },
  reducers: {
    // ✅ Sets the entire message history for one conversation
    setMessages: (state, action) => {
      const { conversationId, messages } = action.payload;
      state.messages[conversationId] = messages;
    },
    // ✅ Adds one new message to a conversation (for real-time updates)
    addMessage: (state, action) => {
      const { conversationId, message } = action.payload;
      // Ensure the conversation array exists before adding a message
      if (!state.messages[conversationId]) {
        state.messages[conversationId] = [];
      }
      state.messages[conversationId].push(message);
    },
  },
});

// ✅ Export the new and updated actions
export const { setMessages, addMessage } = messageSlice.actions;
export default messageSlice.reducer;