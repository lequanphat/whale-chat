import { Button, Typography } from '@mui/material';
import AuthContainer from './AuthContainer';
import { getUser } from '../../store/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { openSnackbar } from '../../store/slices/appSlice';

export default function VerifyAccount() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const handleJoinNow = async () => {
    const response = await dispatch(getUser());
    console.log(response);

    if (response.error) {
      alert(response.payload.error);
      return;
    }
    dispatch(openSnackbar({ message: 'You have successfully registered your account!', serverity: 'success' }));
    localStorage.setItem('accessToken', response.payload.token);
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
