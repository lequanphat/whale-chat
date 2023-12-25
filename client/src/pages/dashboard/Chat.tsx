import { Box, Stack, useTheme } from '@mui/material';
import Contact from '../../components/contacts/Contact';
import SharedMessages from '../../components/contacts/SharedMessages';
import { useDispatch, useSelector } from 'react-redux';
import { stateType } from '../../store/interface';
import ChatHeader from '../../components/chat/ChatHeader';
import Message from '../../components/chat/Message';
import ChatFooter from '../../components/chat/ChatFooter';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getMessages, setCurrentContact } from '../../store/slices/chatSlice';

export const Chat = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dispatch = useDispatch<any>();
    const navigate = useNavigate();
    const { sidebar } = useSelector((state: stateType) => state.app);
    const { contacts, chats } = useSelector((state: stateType) => state.chat);
    const { id } = useSelector((state: stateType) => state.auth);
    const { chatId } = useParams();
    const theme = useTheme();

    useEffect(() => {
        const result = contacts.findIndex((contact) => contact._id === chatId);
        if (result === -1) {
            dispatch(setCurrentContact(null));
            navigate('/app/chat');
        } else {
            dispatch(setCurrentContact(result));
            const chat = chats.findIndex((item) => item.id === chatId);
            if (chat === -1) {
                dispatch(getMessages({ userId: id, contactId: chatId }));
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatId, contacts]);

    return (
        <>
            <Box
                flexGrow={1}
                sx={{
                    height: '100%',
                    backgroundColor: theme.palette.mode === 'light' ? '#fff' : theme.palette.background.default,
                }}
            >
                <Stack height="100%" maxHeight="100vh" width="100%">
                    <ChatHeader />
                    {/* chat messages */}

                    <Message />
                    <ChatFooter />
                </Stack>
            </Box>
            {sidebar.open &&
                (() => {
                    switch (sidebar.type) {
                        case 'CONTACT':
                            return <Contact />;
                        case 'STARRED':
                            return <Contact />;
                        case 'SHARED':
                            return <SharedMessages />;
                        default:
                            return <></>;
                    }
                })()}
        </>
    );
};
