import { useEffect } from 'react';
import { useSocket } from './useSocket';
import { useDispatch, useSelector } from 'react-redux';
import { addMessageToCurrentMessages } from '../store/slices/chatSlice';
import { stateType } from '../store/interface';

export const useChatSocket = () => {
    const dispatch = useDispatch();
    const { socket } = useSocket();
    const { contacts, currentContact } = useSelector((state: stateType) => state.contacts);
    useEffect(() => {
        console.log('runnnnn');
        if (!socket) {
            return;
        }
        socket.on('recieve-message', (data) => {
            console.log(data);
            
            if (data.from === contacts[currentContact]._id) {
                // Nếu tin nhắn đến từ chat hiện tại
                dispatch(addMessageToCurrentMessages(data));
                return;
            }
        });
        return () => {
            console.log('unmout-event-socket');

            socket.off('recieve-message');
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contacts, currentContact]);
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
