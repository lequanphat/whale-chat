import { useEffect } from 'react';
import { useSocket } from './useSocket';
import { useDispatch } from 'react-redux';
import { addMessageToCurrentMessages } from '../store/slices/chatSlice';

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
            dispatch(addMessageToCurrentMessages(data));
        });
        return () => {
            console.log('unmout-event-socket');
            socket.off('recieve-message');
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const emitMessage = ({
        type,
        text,
        to,
        from,
        image,
        doc,
    }: {
        type: string;
        text?: string;
        to: string;
        from: string;
        image?: string;
        doc?: string;
    }) => {
        socket.emit('send-message', { type, text, to, from, image, doc });
    };
    return { emitMessage };
};
