import { Box, IconButton, Stack, useTheme } from '@mui/material';
import { IoSendSharp } from 'react-icons/io5';
import ChatInput from './ChatInput';
import { useChatSocket } from '../../hooks/useChatSocket';
import { useDispatch, useSelector } from 'react-redux';
import { stateType } from '../../store/interface';
import { resetMessage } from '../../store/slices/chatSlice';

const ChatFooter = () => {
    const dispatch = useDispatch();
    const { id } = useSelector((state: stateType) => state.auth);
    const { contacts, currentContact } = useSelector((state: stateType) => state.contacts);
    const { message } = useSelector((state: stateType) => state.chat);
    const { emitMessage } = useChatSocket();
    const theme = useTheme();

    const handleSendMessage = () => {
        emitMessage({ message, from: id, to: contacts[currentContact]._id });
        dispatch(resetMessage());
    };
    return (
        <Box
            p={2}
            sx={{
                width: '100%',
                backgroundColor: theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background.paper,
                boxShadow: '0px 0px 2px rgba(0,0,0, .25)',
            }}
        >
            <Stack direction="row" alignItems="center" spacing={2}>
                <ChatInput />
                <Stack alignItems="center" justifyContent="center" sx={{ width: 46, height: 42 }}>
                    <IconButton onClick={handleSendMessage}>
                        <IoSendSharp color={theme.palette.primary.main} size={34} />
                    </IconButton>
                </Stack>
            </Stack>
        </Box>
    );
};

export default ChatFooter;
