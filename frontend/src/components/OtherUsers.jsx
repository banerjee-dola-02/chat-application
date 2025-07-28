// import React from 'react'
// import OtherUser from './OtherUser'
// import useGetOtherUsers from '../hooks/useGetOtherUsers';
// import { useSelector } from 'react-redux';


// const OtherUsers = () => {
//   //my custom hook
//   useGetOtherUsers();
//   const {otherUsers}=useSelector(store=>store.user);
//   if(!otherUsers) return;    //early return in react
//   return (
//     <div className='overflow-auto flex-1'>
//         {
//           otherUsers?.map((user)=>{
//             return (
//               <OtherUser key={user._id} user={user}/>
//             )
//           })
//         }
//     </div>
//   )
// }

// export default OtherUsers



import React from 'react';
import OtherUser from './OtherUser';
// We no longer need useSelector or the custom hook here

const OtherUsers = ({ users }) => { // ✅ 1. Accept 'users' as a prop
    
    // Early return if the users array is not available
    if (!users) return null;

    return (
        <div className='overflow-auto flex-1'>
            {
                // ✅ 2. Map over the 'users' array from props
                users.map((user) => {
                    return (
                        <OtherUser key={user._id} user={user} />
                    )
                })
            }
        </div>
    )
}

export default OtherUsers;
