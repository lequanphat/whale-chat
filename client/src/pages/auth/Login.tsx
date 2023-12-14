/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { loginSchema } from './Scheme';
import { Typography, Button, Stack, Box, useTheme } from '@mui/material';
import logo from '../../assets/logo.png';
import AuthSocial from './AuthSocial';
import AuthInput from '../../components/input/AuthInput';
interface FormValues {
    username: string;
    password: string;
}
const initialValues: FormValues = {
    username: '',
    password: '',
};
const initialErrors: FormValues = {
    username: 'Please enter username',
    password: 'Please enter password',
};
const Login = () => {
    // const theme = useTheme();
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const { values, setValues, handleBlur, handleChange, errors } = useFormik({
        initialValues,
        initialErrors,
        validationSchema: loginSchema,
        onSubmit: (values) => {
            console.log('Form submitted with values:', values);
        },
    });

    // const handleLogin = async () => {
    // e.preventDefault();
    // // validate
    // if (errors.password || errors.username) {
    //     if (errors.password) {
    //         setPasswordError(errors.password);
    //     }
    //     if (errors.username) {
    //         setUsernameError(errors.username);
    //     }
    //     return;
    // }
    // // call api
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
    // navigate('/');
    // };

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
        <Box
            sx={{
                width: '100vw',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff',
            }}
        >
            <Box
                p={3}
                sx={{
                    width: '25rem',
                    backgroundColor: 'white',
                    borderRadius: 1,
                    boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
                }}
            >
                <Stack direction="row" alignItems="center" spacing={1} justifyContent="start" pb={4}>
                    <img src={logo} alt="logo" style={{ width: 60, height: 60 }} />
                    <Typography variant="h5" component="h1" color={'#3498db'}>
                        LOGIN
                    </Typography>
                </Stack>

                <AuthInput
                    title="Username"
                    name="username"
                    value={values.username}
                    error={usernameError}
                    type={undefined}
                    handleBlur={(e) => {
                        handleBlurCustom(e, setUsernameError, errors.username);
                    }}
                    handleChange={(e) => {
                        handleChangeCustom(e, setUsernameError);
                    }}
                />
                <AuthInput
                    title="Password"
                    value={values.password}
                    name="password"
                    error={passwordError}
                    type={'password'}
                    handleBlur={(e) => {
                        handleBlurCustom(e, setPasswordError, errors.password);
                    }}
                    handleChange={(e) => {
                        handleChangeCustom(e, setPasswordError);
                    }}
                />

                {loginError && <p className="login-error">{loginError}</p>}
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    sx={{
                        backgroundColor: '#3498db', // Màu nền của button
                        padding: '10px 24px', // Padding cho button
                        '&:hover': {
                            backgroundColor: '#2980b9', // Màu nền hover
                        },
                    }}
                >
                    LOGIN
                </Button>
                <Typography
                    variant="subtitle2"
                    component="p"
                    pt={1}
                    color="#2980b9"
                    sx={{ cursor: 'pointer' }}
                    onClick={() => {
                        alert('Ráng mà nhớ!! Có cái mật khẩu cũng quên!!');
                    }}
                >
                    Forgot password
                </Typography>

                <AuthSocial />

                <Stack direction="row" justifyContent="center" mt={3}>
                    <Typography variant="body1" component="p" mr={0.5}>
                        You don't have an account?
                    </Typography>
                    <Typography
                        variant="body2"
                        component="p"
                        sx={{ color: 'var(--primary-color)', cursor: 'pointer' }}
                        onClick={() => {
                            navigate('/auth/register');
                        }}
                    >
                        Register
                    </Typography>
                </Stack>
            </Box>
        </Box>
    );
};

export default Login;
