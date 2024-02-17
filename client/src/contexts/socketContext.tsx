import { createContext, useEffect, useState } from 'react';
import { io as ClientIO } from 'socket.io-client';
import { BACKEND_SERVER_PATH } from '../config';
import { useDispatch, useSelector } from 'react-redux';
import { stateType } from '../store/interface';
import { addMessageToCurrentMessages, addNewContact, openIncomingCall } from '../store/slices/chatSlice';
import { addFriendRequest } from '../store/slices/relationshipSlice';
import { addNotification } from '../store/slices/notificationSlice';

type SocketContextType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  socket: any | null;
  isConnected: boolean;
};

export const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
});

export const SocketProvider = ({ children }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const { id, token } = useSelector((state: stateType) => state.auth);
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  useEffect(() => {
    const socketInstance = ClientIO(`${BACKEND_SERVER_PATH}/socket`, {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${token}`,
          },
        },
      },
    });
    socketInstance.on('connect', () => {
      setIsConnected(true);
      console.log('connected...');
    });
    socketInstance.emit('user-connected', id);
    socketInstance.on('disconnect', () => {
      setIsConnected(false);
      console.log('disconnected...');
    });
    socketInstance.on('recieve-message', (data) => {
      console.log(data);

      dispatch(addMessageToCurrentMessages(data));
    });
    socketInstance.on('recieve-friend-request', (data) => {
      dispatch(addFriendRequest(data));
    });
    socketInstance.on('recieve-accept-friend', (data) => {
      dispatch(addNewContact(data));
    });
    socketInstance.on('recieve-notification', (data) => {
      dispatch(addNotification(data));
    });

    // video call
    socketInstance.on('incoming-video-call', (data) => {
      console.log('====================================');
      console.log(data);
      console.log('====================================');
      dispatch(openIncomingCall(data));
    });

    setSocket(socketInstance);
    return () => {
      console.log('unmout-event-socket');
      socketInstance.off('recieve-message');
      socketInstance.off('recieve-friend-request');
      socketInstance.disconnect();
    };
  }, [id, dispatch, token]);
  return <SocketContext.Provider value={{ socket, isConnected }}>{children}</SocketContext.Provider>;
};
