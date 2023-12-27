import { Stack } from '@mui/material';
import { DocMessage, MediaMessage, TextMessage, VoiceMessage } from './MessageTypes';
import { useSelector } from 'react-redux';
import { stateType } from '../../store/interface';
import { useEffect, useRef } from 'react';
import { Scrollbar } from '../scrollbar/Scrollbar';
import Loading from '../loading/Loading';

const Message = ({ currentMessages }) => {
    const { id } = useSelector((state: stateType) => state.auth);

    const { isMessagesLoading } = useSelector((state: stateType) => state.chat);
    const scrollRef = useRef(null);

    useEffect(() => {
        scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }, [scrollRef, currentMessages]);

    return isMessagesLoading ? (
        <Loading />
    ) : (
        <Scrollbar
            sx={{
                flexGrow: 1,
                width: '100%',
                boxShadow: '0px 0px 2px rgba(0,0,0, .25)',
            }}
            ref={scrollRef}
            p={2}
        >
            <Stack spacing={1.5}>
                {currentMessages.map(
                    (
                        msg: { _id: string; type: string; text: string; from: string; to: string; image?: string },
                        index: number,
                    ) => {
                        switch (msg.type) {
                            case 'text':
                                return <TextMessage key={index} msg={msg} fromSelf={msg.from === id} />;
                            case 'image':
                                return <MediaMessage key={index} msg={msg} fromSelf={msg.from === id} />;
                            case 'doc':
                                return <DocMessage key={index} msg={msg} fromSelf={msg.from === id} />;
                            case 'voice':
                                return <VoiceMessage key={index} msg={msg} fromSelf={msg.from === id} />;
                            default:
                                return '123';
                        }
                    },
                )}
            </Stack>
        </Scrollbar>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export default Message;
