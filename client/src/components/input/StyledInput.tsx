import { TextField } from '@mui/material';
import { styled } from '@mui/material/styles';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledInput = styled(TextField)(({ theme }) => ({
    '& .MuiInputBase-input': {
        paddingTop: '12px',
        paddingBottom: '12px',
    },
    '.css-jf1ff9-MuiInputBase-root-MuiFilledInput-root': {
        paddingLeft: 0,
        paddingRight: 6,
        borderRadius: 12,
    },
}));

export default StyledInput;
