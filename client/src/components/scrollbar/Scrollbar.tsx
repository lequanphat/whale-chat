import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';

const Scrollbar = styled(Stack)(() => ({
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
        display: 'none',
        width: '0.3rem',
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.1)',
        borderRadius: '4px',
    },
    '&::-webkit-scrollbar-track': {
        backgroundColor: 'transparent',
    },
}));

export { Scrollbar };
