import { Box, Stack } from '@mui/material';
import { DocMessage, MediaMessage, TextMessage } from './MessageTypes';
import { useSelector } from 'react-redux';
import { stateType } from '../../store/interface';
import React, { useEffect, useRef } from 'react';

const Message = () => {
    const { id } = useSelector((state: stateType) => state.auth);
    const { messages } = useSelector((state: stateType) => state.chat);
    const scrollRef = useRef(null);

    useEffect(() => {
        console.log('scroll into view');
        console.log(scrollRef.current);
        scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, [messages, scrollRef]);
    console.log('message render....');

    return (
        <Box p={2}>
            <Stack spacing={3}>
                {messages.map(
                    (msg: { _id: string; type: string; text: string; from: string; to: string; image?: string }) => {
                        switch (msg.type) {
                            case 'text':
                                return (
                                    <TextMessage ref={scrollRef} key={msg._id} msg={msg} fromSelf={msg.from === id} />
                                );
                            case 'image':
                                return (
                                    <MediaMessage ref={scrollRef} key={msg._id} msg={msg} fromSelf={msg.from === id} />
                                );
                            case 'doc':
                                return (
                                    <DocMessage ref={scrollRef} key={msg._id} msg={msg} fromSelf={msg.from === id} />
                                );
                            default:
                                return <></>;
                        }
                    },
                )}
            </Stack>
        </Box>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export default React.memo(Message);
