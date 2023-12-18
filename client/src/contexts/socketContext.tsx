import { createContext, useEffect, useState } from 'react';
import { io as ClientIO } from 'socket.io-client';
import { BACKEND_SERVER_PATH } from '../config';
import { useSelector } from 'react-redux';
import { stateType } from '../store/interface';

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
    const { id } = useSelector((state: stateType) => state.auth);
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    useEffect(() => {
        const socketInstance = ClientIO(BACKEND_SERVER_PATH);
        socketInstance.on('connect', () => {
            setIsConnected(true);
            console.log('connected...');
        });
        socketInstance.emit('user-connected', id);
        socketInstance.on('disconnect', () => {
            setIsConnected(false);
            console.log('disconnected...');
        });
        setSocket(socketInstance);
        return () => {
            socketInstance.disconnect();
        };
    }, [id]);
    return <SocketContext.Provider value={{ socket, isConnected }}>{children}</SocketContext.Provider>;
};
