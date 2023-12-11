// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react';
import Chats from '../../components/chat/Chats';
import { Box, Stack } from '@mui/material';
import Conversation from '../../components/chat';
import { useTheme } from '@mui/material/styles';
import Contact from '../../components/contacts/Contact';
import { useSelector } from 'react-redux';
import SharedMessages from '../../components/contacts/SharedMessages';
const GeneralApp = () => {
    const theme = useTheme();
    const { sidebar } = useSelector((store) => store.app);
    return (
        <Stack direction="row" sx={{ width: '100%' }}>
            <Chats />
            <Box
                flexGrow={1}
                sx={{
                    height: '100%',
                    backgroundColor: theme.palette.mode === 'light' ? '#fff' : theme.palette.background.default,
                }}
            >
                <Conversation />
            </Box>
            {sidebar.open &&
                (() => {
                    switch (sidebar.type) {
                        case 'CONTACT':
                            return <Contact />
                        case 'STARRED':
                            return <Contact />
                        case 'SHARED':
                            return <SharedMessages />
                        default:
                            return <></>
                    }
                })()}
        </Stack>
    );
};

export default GeneralApp;
