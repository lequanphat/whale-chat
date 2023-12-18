import { Box, Stack } from '@mui/material';
import { TextMessage } from './MessageTypes';
import { useDispatch, useSelector } from 'react-redux';
import { stateType } from '../../store/interface';
import { useEffect, useRef } from 'react';
import { getMessages } from '../../store/slices/chatSlice';

const Message = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dispatch = useDispatch<any>();
    const { id } = useSelector((state: stateType) => state.auth);
    const { messages } = useSelector((state: stateType) => state.chat);
    const { contacts, currentContact } = useSelector((state: stateType) => state.contacts);
    const scrollRef = useRef(null);

    useEffect(() => {
        dispatch(getMessages({ userId: id, contactId: contacts[currentContact]._id }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentContact, id, contacts]);

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);
    return (
        <Box p={2}>
            <Stack spacing={3}>
                {messages.map((msg, index) => {
                    return <TextMessage ref={scrollRef} key={index} msg={msg} fromSelf={msg.from === id} />;
                })}
            </Stack>
        </Box>
    );
};

export default Message;
