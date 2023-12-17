import { Button, Typography } from '@mui/material';
import AuthContainer from './AuthContainer';
import { useDispatch } from '../../store';
import { getUser } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export default function VerifyAccount() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleJoinNow = async () => {
        const response = await dispatch(getUser());
        if (response.error) {
            alert(response.payload.error);
            return;
        }
        navigate('/');
    };
    return (
        <AuthContainer title="CONGRATULATION!">
            <>
                <Typography pb={2.4} fontSize={17} textAlign="start">
                    Congratulations, you have successfully registered your account. Let's chat now!
                </Typography>
                <Button sx={{ float: 'right' }} variant="outlined" onClick={handleJoinNow}>
                    JOIN NOW
                </Button>
            </>
        </AuthContainer>
    );
}
