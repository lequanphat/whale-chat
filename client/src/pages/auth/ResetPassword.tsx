import { Button, Stack, Typography } from '@mui/material';
import AuthContainer from './AuthContainer';
import AuthInput from '../../components/input/AuthInput';
import { useFormik } from 'formik';
import { useState } from 'react';
import { resetPasswordSchema } from './Scheme';
import { useNavigate, useParams } from 'react-router-dom';
import { GoChevronLeft } from 'react-icons/go';
import { useDispatch } from '../../store';
import { userChangePassword } from '../../store/slices/authSlice';
const initialValues = {
    password: '',
    confirmPassword: '',
};
const initialErrors = {
    password: '',
    confirmPassword: '',
};
export default function ResetPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { token } = useParams();
    const [resetPasswordError, setResetPasswordError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const { values, setValues, handleBlur, handleChange, errors } = useFormik({
        initialValues,
        initialErrors,
        validationSchema: resetPasswordSchema,
        onSubmit: undefined,
    });
    const handleBlurCustom = (
        event: React.FocusEvent<HTMLInputElement>,
        setError: (error: string) => void,
        error: string,
    ) => {
        setResetPasswordError('');
        setError(error);
        handleBlur(event);
    };
    const handleChangeCustom = (event: React.ChangeEvent<HTMLInputElement>, setError: (error: string) => void) => {
        setError('');
        setResetPasswordError('');
        handleChange(event);
        setValues({ ...values, [event.target.name]: event.target.value });
    };

    const handleChangePassword = async () => {
        if (errors.password || errors.confirmPassword) {
            if (errors.password) {
                setPasswordError(errors.password);
            }
            if (errors.confirmPassword) {
                setConfirmPasswordError(errors.confirmPassword);
            }
            return;
        }
        const response = await dispatch(userChangePassword({ password: values.password, token }));
        if (response.error) {
            setResetPasswordError(response.payload.error);
            return;
        }
        navigate('/auth/login');
    };
    return (
        <AuthContainer title="RESET PASSWORD">
            <>
                <Typography pb={2.4} fontSize={15}>
                    Please set your new password.
                </Typography>
                <AuthInput
                    password
                    title="Password"
                    name="password"
                    error={passwordError}
                    value={values.password}
                    handleBlur={(e) => {
                        handleBlurCustom(e, setPasswordError, errors.password);
                    }}
                    handleChange={(e) => {
                        handleChangeCustom(e, setPasswordError);
                    }}
                />
                <AuthInput
                    password
                    title="Confirm Password"
                    name="confirmPassword"
                    error={confirmPasswordError}
                    value={values.confirmPassword}
                    handleBlur={(e) => {
                        handleBlurCustom(e, setConfirmPasswordError, errors.confirmPassword);
                    }}
                    handleChange={(e) => {
                        handleChangeCustom(e, setConfirmPasswordError);
                    }}
                />
                {resetPasswordError && (
                    <Typography variant="body1" color={'#e74c3c'} fontSize={14} pb={1}>
                        *{resetPasswordError}
                    </Typography>
                )}
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                        bgcolor: '#3498db', // Màu nền của button
                        padding: '10px 24px', // Padding cho button
                        '&:hover': {
                            bgcolor: '#2980b9', // Màu nền hover
                        },
                    }}
                    onClick={handleChangePassword}
                >
                    SUBMIT
                </Button>
                <Stack
                    direction="row"
                    alignItems="center"
                    pt={2}
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                        navigate('/auth/login');
                    }}
                    color="#999"
                >
                    <GoChevronLeft size={22} />
                    <Typography variant="body2" fontSize={14}>
                        Return to Login
                    </Typography>
                </Stack>
            </>
        </AuthContainer>
    );
}
