import { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const { authUser } = useSelector((store) => store.user);

  useEffect(() => {
    if (authUser) {
      const newSocket = io("http://localhost:8080", { // Your backend URL
        query: {
          userId: authUser._id,
        },
      });
      setSocket(newSocket);

      // Cleanup function to close the socket when the component unmounts
      return () => newSocket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};