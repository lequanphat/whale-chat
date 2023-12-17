import { useEffect } from 'react';
import { useSocket } from './useSocket';
import { useDispatch } from 'react-redux';
import { setRecieveMessage } from '../store/slices/chatSlice';

export const useChatSocket = () => {
    const dispatch = useDispatch();
    const { socket } = useSocket();
    useEffect(() => {
        console.log('runnnnn');
        if (!socket) {
            return;
        }
        socket.on('recieve-message', (data) => {
            console.log(data);
            dispatch(setRecieveMessage(data.message));
        });
        return () => {
            socket.off('recieve-message');
        };
    }, []);
    const emitMessage = ({ message, to, from }) => {
        socket.emit('send-message', { message, to, from });
    };
    return { emitMessage };
};
