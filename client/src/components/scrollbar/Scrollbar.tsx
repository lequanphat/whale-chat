/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';

const Scrollbar = styled(Stack)(({ scrollbar }) => ({
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
        display: scrollbar ? 'auto' : 'none',
        width: '0.3rem',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.1)', // Màu của thanh cuộn
        borderRadius: '4px', // Độ cong của thanh cuộn
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: 'transparent', // Màu nền của thanh cuộn
    },
}));

export { Scrollbar };
