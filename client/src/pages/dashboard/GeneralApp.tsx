// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import React from 'react';
import Chats from '../../components/chat/Chats';
import { Stack } from '@mui/material';

import { Outlet } from 'react-router-dom';
const GeneralApp = () => {
    return (
        <Stack direction="row" sx={{ width: '100%' }}>
            <Chats />
            <Outlet />
        </Stack>
    );
};

export default GeneralApp;
