//****************************************** */

//import React ,{useEffect} from 'react'
// import axios from "axios";
// import { useSelector,useDispatch } from 'react-redux';
// import { setMessages } from '../redux/messageSlice';




// const useGetMessages = () => {
//     const {selectedUser} = useSelector(store=>store.user);
//     const dispatch = useDispatch();

//     useEffect(()=>{
//         const fetchMessages= async ()=>{



//              // ✅ IMPORTANT: Clear messages when selectedUser changes
//             dispatch(setMessages([])); // or setMessages([]) if you prefer an empty array

//             if (!selectedUser?._id) { // Only fetch if a user is selected
//                 return;
//             }



//             try{
//                 axios.defaults.withCredentials=true;
//                 const res= await axios.get(`http://localhost:8080/api/v1/message/${selectedUser?._id}`);
//                 console.log(res);
//                 dispatch(setMessages(res.data))
//             }catch(error){
//                 console.log(error);
//             }
//         };
//         fetchMessages();
//     },[selectedUser?._id, dispatch]);
// }

// export default useGetMessages;











import React, { useEffect } from 'react';
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { setMessages } from '../redux/messageSlice';

const useGetMessages = () => {
    // ✅ Get the selected user AND the message cache from the store
    const { selectedUser } = useSelector(store => store.user);
    const { messages: messageCache } = useSelector(store => store.message);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMessages = async () => {
            // Ensure a user is selected before doing anything
            if (!selectedUser?._id) return;
            
            // ✅ Only fetch messages if they are NOT already in the cache
            if (!messageCache[selectedUser._id]) {
                try {
                    axios.defaults.withCredentials = true;
                    const res = await axios.get(`http://localhost:8080/api/v1/message/${selectedUser._id}`);
                    
                    // ✅ Dispatch in the correct format for the updated reducer
                    dispatch(setMessages({ conversationId: selectedUser._id, messages: res.data }));
                } catch (error) {
                    console.log("Error fetching messages:", error);
                    // Optional: If an error occurs, set an empty array to prevent re-fetching
                    dispatch(setMessages({ conversationId: selectedUser._id, messages: [] }));
                }
            }
        };

        fetchMessages();
    }, [selectedUser?._id, dispatch, messageCache]); // ✅ Add messageCache to dependencies
}

export default useGetMessages;