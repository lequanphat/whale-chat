import { Stack } from '@mui/material';
import ChatHeader from './ChatHeader';
import ChatFooter from './ChatFooter';
import Message from './Message';
import { Scrollbar } from '../scrollbar/Scrollbar';
const Conversation = () => {
    return (
        <Stack height="100%" maxHeight="100vh" width="100%">
            <ChatHeader />
            {/* chat messages */}
            <Scrollbar
                sx={{
                    flexGrow: 1,
                    width: '100%',
                    boxShadow: '0px 0px 2px rgba(0,0,0, .25)',
                }}
            >
                <Message />
            </Scrollbar>

            <ChatFooter />
        </Stack>
    );
};

export default Conversation;
