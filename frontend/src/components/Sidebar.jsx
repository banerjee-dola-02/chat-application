import React, { useState } from 'react';
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from './OtherUsers';
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser, setOtherUsers, setSelectedUser } from '../redux/userSlice';
import { setMessages } from '../redux/messageSlice'; // ✅ 1. Import clearMessages
import useGetOtherUsers from '../hooks/useGetOtherUsers'; // 👈 1. IMPORT THE HOOK

const Sidebar = () => {
    const [search, setSearch] = useState("");
    const { otherUsers } = useSelector(store => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useGetOtherUsers(); // 👈 2. CALL THE HOOK HERE

    const logoutHandler = async () => {
        try {
            // ✅ 2. Use environment variable for the URL
            const apiUrl = process.env.REACT_APP_API_URL;
            const res = await axios.get(`${apiUrl}/api/v1/user/logout`);
            
            navigate("/login");
            toast.success(res.data.message);
            dispatch(setAuthUser(null));
            dispatch(setMessages({})); // ✅ 3. Reset messages to an empty object
            dispatch(setOtherUsers(null));
            dispatch(setSelectedUser(null));
        } catch (error) {
            console.log(error);
        }
    }
    
    // ✅ 4. Filter users locally for search instead of dispatching
    const filteredUsers = otherUsers?.filter((user) => 
        user.fullName.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className='border-r border-slate-500 p-4 flex flex-col'>
            {/* Search input without a form for live filtering */}
            <div className='flex items-center gap-2'>
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className='input input-bordered rounded-md' type="text"
                    placeholder='Search...'
                />
                <button type='submit' className='btn bg-zinc-700 text-white'>
                    <BiSearchAlt2 className='w-6 h-6 outline-none' />
                </button>
            </div>
            <div className="divider px-3"></div>
            {/* ✅ 5. Pass the filtered users as a prop */}
            <OtherUsers users={filteredUsers} />
            <div className='mt-2'>
                <button onClick={logoutHandler} className='btn btn-sm'>Logout</button>
            </div>
        </div>
    )
}

export default Sidebar;
