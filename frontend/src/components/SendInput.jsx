// import React,{useState} from 'react'
// import { IoSend } from "react-icons/io5";
// import axios from "axios";
// import {useDispatch,useSelector} from "react-redux";
// import { setMessages } from '../redux/messageSlice';

// const SendInput = () => {
//     const [message, setMessage] = useState("");
//     const dispatch = useDispatch();
//     const {selectedUser} = useSelector(store=>store.user);
//     const {messages} = useSelector(store=>store.message);

//     const onSubmitHandler = async (e) =>{
//         e.preventDefault();
//         try{
//             const res=await axios.post(`http://localhost:8080/api/v1/message/send/${selectedUser?._id}`, {message}, {
//                 headers:{
//                     'Content-Type':'application/json'
//                 },
//                 withCredentials:true
//             });
//             console.log(res);
//             dispatch(setMessages([...messages, res?.data?.newMessage]))

//         }catch(error){
//             console.log(error);
//         }
//         // alert(message);
//         setMessage("");
//     }
//   return (
//         <form onSubmit={onSubmitHandler} className='px-4 my-3'>
//             <div className='w-full relative'>
//                 <input 
//                 value={message}
//                 onChange={(e)=>setMessage(e.target.value)}
//                 type="text"
//                 placeholder='Send a message...'
//                 className='border text-sm rounded-lg block w-full p-3 border-zinc-500 bg-gray-600 text-white'
//                 />
//                 <button type="submit" className='absolute flex inset-y-0 end-0 items-center pr-4'>
//                     <IoSend />
//                 </button>
//             </div>
//         </form>
//   )
// }

// export default SendInput



import React, { useState } from 'react';
import { IoSend } from "react-icons/io5";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { addMessage } from '../redux/messageSlice'; // 👈 1. Import addMessage

const SendInput = () => {
    const [message, setMessage] = useState("");
    const { selectedUser } = useSelector(store => store.user);
    const dispatch = useDispatch(); // 👈 2. Get the dispatch function

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!message) return; // Prevent sending empty messages

        try {
            const apiUrl = process.env.REACT_APP_API_URL;
            const res = await axios.post(`${apiUrl}/api/v1/message/send/${selectedUser?._id}`, { message }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            // 3. Dispatch the new message from the API response
            dispatch(addMessage({ conversationId: selectedUser._id, message: res.data }));

        } catch (error) {
            console.log(error);
        }
        setMessage("");
    }
    return (
        <form onSubmit={onSubmitHandler} className='px-4 my-3'>
            <div className='w-full relative'>
                <input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    type="text"
                    placeholder='Send a message...'
                    className='border text-sm rounded-lg block w-full p-3 border-zinc-500 bg-gray-600 text-white'
                />
                <button type="submit" className='absolute flex inset-y-0 end-0 items-center pr-4'>
                    <IoSend />
                </button>
            </div>
        </form>
    )
}

export default SendInput;
