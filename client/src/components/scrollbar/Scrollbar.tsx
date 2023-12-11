import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';

interface ScrollbarProps {
    scrollbar: boolean;
}

const Scrollbar = styled(Stack)(({ scrollbar }: ScrollbarProps) => ({
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
        display: scrollbar ? 'auto' : 'none',
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
