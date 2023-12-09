import { Box, IconButton, Stack } from '@mui/material';
import React from 'react';
import { IoSendSharp } from 'react-icons/io5';
import { useTheme } from '@emotion/react';
import ChatInput from './ChatInput';

const ChatFooter = () => {
    const theme = useTheme();
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
                    <IconButton>
                        <IoSendSharp color={theme.palette.primary.main} size={34} />
                    </IconButton>
                </Stack>
            </Stack>
        </Box>
    );
};

export default ChatFooter;
