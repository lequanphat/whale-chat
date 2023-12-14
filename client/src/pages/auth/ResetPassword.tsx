import { Button, IconButton, Stack, Typography } from '@mui/material';
import AuthContainer from './AuthContainer';
import AuthInput from '../../components/input/AuthInput';
import { useFormik } from 'formik';
import { useState } from 'react';
import { resetPasswordSchema } from './Scheme';
import { useNavigate } from 'react-router-dom';
import { GoChevronLeft } from 'react-icons/go';
const initialValues = {
    password: '',
    confirmPassword: '',
};
const initialErrors = {
    password: '',
    confirmPassword: '',
};
export default function ResetPassword() {
    const navigate = useNavigate();
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
        setError(error);
        handleBlur(event);
    };
    const handleChangeCustom = (event: React.ChangeEvent<HTMLInputElement>, setError: (error: string) => void) => {
        setError('');
        handleChange(event);
        setValues({ ...values, [event.target.name]: event.target.value });
    };
    return (
        <AuthContainer title="RESET PASSWORD">
            <>
                <Typography pb={2.4} fontSize={15}>
                    Please set your new password.
                </Typography>
                <AuthInput
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
                    onClick={() => {
                        navigate('/auth/reset-password');
                    }}
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
                >
                    <IconButton>
                        <GoChevronLeft />
                    </IconButton>
                    <Typography variant="body2" color="#999" fontSize={14}>
                        Return to Login
                    </Typography>
                </Stack>
            </>
        </AuthContainer>
    );
}
