// @mui
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';

const Scrollbar = styled(Stack)({
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
        display: 'none',
        width: '0.3rem',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu của thanh cuộn
        borderRadius: '4px', // Độ cong của thanh cuộn
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: 'rgba(0, 0, 0, 0.1)', // Màu nền của thanh cuộn
    },
});

export { Scrollbar };
