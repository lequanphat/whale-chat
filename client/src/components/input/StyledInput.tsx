import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledInput = styled(TextField)(({ theme }) => ({
    backgroundColor: '#EAF2FE',
    borderRadius: '.4rem',
    '& .MuiInputBase-input': {
        paddingTop: '12px',
        paddingBottom: '12px',
        '&::placeholder': { 
            color: '#3498db',
            opacity: 0.7, 
        }
    },
    '.css-jf1ff9-MuiInputBase-root-MuiFilledInput-root': {
        paddingLeft: 0,
        paddingRight: 6,
        borderRadius: 12,
    },
}));

export default StyledInput;
