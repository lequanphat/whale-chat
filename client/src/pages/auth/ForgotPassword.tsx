import { Button, Stack, Typography } from '@mui/material';
import { GoChevronLeft } from 'react-icons/go';
import AuthContainer from './AuthContainer';
import AuthInput from '../../components/input/AuthInput';
import { useFormik } from 'formik';
import { useState } from 'react';
import { forgotPasswordSchema } from './Scheme';
import { useNavigate } from 'react-router-dom';
const initialValues = {
    email: '',
};
const initialErrors = {
    email: 'Please enter your email',
};
export default function ForgotPassword() {
    const navigate = useNavigate();
    const [emailError, setEmailError] = useState('');
    const { values, setValues, handleBlur, handleChange, errors } = useFormik({
        initialValues,
        initialErrors,
        validationSchema: forgotPasswordSchema,
        onSubmit: undefined,
    });
    const handleBlurCustom = (event: React.FocusEvent<HTMLInputElement>) => {
        setEmailError(errors.email);
        handleBlur(event);
    };
    const handleChangeCustom = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmailError('');
        handleChange(event);
        setValues({ ...values, [event.target.name]: event.target.value });
    };
    return (
        <AuthContainer title="FORGOT PASSWORD">
            <>
                <Typography pb={2.4} fontSize={15}>
                    Please enter your email address associated with your account to reset password.
                </Typography>
                <AuthInput
                    title="Email address"
                    name="email"
                    error={emailError}
                    value={values.email}
                    handleBlur={handleBlurCustom}
                    handleChange={handleChangeCustom}
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
                    SEND REQUEST
                </Button>
                <Stack
                    direction="row"
                    alignItems="center"
                    pt={2}
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                        navigate('/auth/register');
                    }}
                    color="#999"
                >
                    <GoChevronLeft size={22} />
                    <Typography variant="body2"  fontSize={14}>
                        Return to Register
                    </Typography>
                </Stack>
            </>
        </AuthContainer>
    );
}
