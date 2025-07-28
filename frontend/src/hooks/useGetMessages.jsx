
import { useEffect } from 'react';
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { setMessages } from '../redux/messageSlice';

const useGetMessages = () => {
    const { selectedUser } = useSelector(store => store.user);
    const { messages: messageCache } = useSelector(store => store.message);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchMessages = async () => {
            if (!selectedUser?._id) return;

            if (!messageCache[selectedUser._id]) {
                try {
                    axios.defaults.withCredentials = true;

                    // ✅ Use the environment variable for the live URL
                    const apiUrl = process.env.REACT_APP_API_URL;
                    const res = await axios.get(`${apiUrl}/api/v1/message/${selectedUser._id}`);
                    
                    dispatch(setMessages({ conversationId: selectedUser._id, messages: res.data }));
                } catch (error) {
                    console.log("Error fetching messages:", error);
                    dispatch(setMessages({ conversationId: selectedUser._id, messages: [] }));
                }
            }
        };

        fetchMessages();
    }, [selectedUser?._id, dispatch, messageCache]);
}

export default useGetMessages;
