import { Button, Stack, Typography } from '@mui/material';
import { GoChevronLeft } from 'react-icons/go';
import AuthContainer from './AuthContainer';
import AuthInput from '../../components/input/AuthInput';
import { useFormik } from 'formik';
import { useState } from 'react';
import { forgotPasswordSchema } from './Scheme';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from '../../store';
import { userForgotPassword } from '../../store/slices/authSlice';
const initialValues = {
    email: '',
};
const initialErrors = {
    email: 'Please enter your email',
};
export default function ForgotPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [forgotPasswordError, setForgotPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const { values, setValues, handleBlur, handleChange, errors } = useFormik({
        initialValues,
        initialErrors,
        validationSchema: forgotPasswordSchema,
        onSubmit: undefined,
    });
    const handleBlurCustom = (event: React.FocusEvent<HTMLInputElement>) => {
        setEmailError(errors.email);
        setForgotPasswordError('');
        handleBlur(event);
    };
    const handleChangeCustom = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmailError('');
        setForgotPasswordError('');
        handleChange(event);
        setValues({ ...values, [event.target.name]: event.target.value });
    };
    const handleForgotPassword = async () => {
        if (errors.email) {
            setEmailError(errors.email);
            return;
        }
        const response = await dispatch(userForgotPassword({ email: values.email }));
        console.log(response);

        if (response.error) {
            setForgotPasswordError(response.payload.error);
            return;
        }
        navigate('/auth/verify-forgot-password')
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
                {forgotPasswordError && (
                    <Typography variant="body1" color={'#e74c3c'} fontSize={14} pb={1}>
                        *{forgotPasswordError}
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
                    onClick={handleForgotPassword}
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
                    <Typography variant="body2" fontSize={14}>
                        Return to Register
                    </Typography>
                </Stack>
            </>
        </AuthContainer>
    );
}
