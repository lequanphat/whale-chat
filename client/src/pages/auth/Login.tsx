/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { loginSchema } from './Scheme';
import { Typography, Button, Stack } from '@mui/material';
import AuthSocial from './AuthSocial';
import AuthInput from '../../components/input/AuthInput';
import AuthContainer from './AuthContainer';
interface FormValues {
    username: string;
    password: string;
}
const initialValues: FormValues = {
    username: '',
    password: '',
};
const initialErrors: FormValues = {
    username: 'Please enter your username',
    password: 'Please enter your password',
};
const Login = () => {
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const { values, setValues, handleBlur, handleChange, errors } = useFormik({
        initialValues,
        initialErrors,
        validationSchema: loginSchema,
        onSubmit: undefined,
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        // validate
        if (errors.password || errors.username) {
            if (errors.password) {
                setPasswordError(errors.password);
            }
            if (errors.username) {
                setUsernameError(errors.username);
            }
            return;
        }
        // call api
        // const response = await dispatch(
        //     userLogin({
        //         username: values.username,
        //         password: values.password,
        //     }),
        // );
        // if (response.error) {
        //     setLoginError(response.payload.error);
        //     return;
        // }
        setLoginError('Can not find username');
        // navigate('/');
    };

    // const googleLogin = async () => {
    //     window.open('http://localhost:2411/api/auth/login/google', '_self');
    // };
    const handleBlurCustom = (
        event: React.FocusEvent<HTMLInputElement>,
        setError: (error: string) => void,
        error: string,
    ) => {
        setError(error);
        setLoginError('');
        handleBlur(event);
    };
    const handleChangeCustom = (event: React.ChangeEvent<HTMLInputElement>, setError: (error: string) => void) => {
        setError('');
        setLoginError('');
        handleChange(event);
        setValues({ ...values, [event.target.name]: event.target.value });
    };
    return (
        <AuthContainer title="LOGIN">
            <>
                <AuthInput
                    title="Username"
                    name="username"
                    value={values.username}
                    error={usernameError}
                    handleBlur={(e) => {
                        handleBlurCustom(e, setUsernameError, errors.username);
                    }}
                    handleChange={(e) => {
                        handleChangeCustom(e, setUsernameError);
                    }}
                />
                <AuthInput
                    password
                    title="Password"
                    value={values.password}
                    name="password"
                    error={passwordError}
                    handleBlur={(e) => {
                        handleBlurCustom(e, setPasswordError, errors.password);
                    }}
                    handleChange={(e) => {
                        handleChangeCustom(e, setPasswordError);
                    }}
                />

                {loginError && (
                    <Typography variant="body1" color={'#e74c3c'} fontSize={14} pb={1}>
                        *{loginError}
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
                    onClick={handleLogin}
                >
                    LOGIN
                </Button>
                <Typography
                    variant="body2"
                    fontSize={14}
                    component="p"
                    pt={1.2}
                    color="#2980b9"
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                        navigate('/auth/forgot-password');
                    }}
                >
                    Forgot password ?
                </Typography>

                <AuthSocial />

                <Stack direction="row" justifyContent="center" mt={3}>
                    <Typography variant="body1" component="p" mr={0.5}>
                        You don't have an account?
                    </Typography>
                    <Typography
                        variant="body2"
                        component="p"
                        sx={{ color: '#2980b9', cursor: 'pointer' }}
                        onClick={() => {
                            navigate('/auth/register');
                        }}
                    >
                        Register
                    </Typography>
                </Stack>
            </>
        </AuthContainer>
    );
};

export default Login;
