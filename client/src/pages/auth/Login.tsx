/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { loginSchema } from './Scheme';
import TextInput from '../../components/input/TextInput';
import { Typography, Button, Stack, Box } from '@mui/material';
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
function Login() {
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const { values, handleBlur, handleChange, errors } = useFormik<FormValues>({
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
    const handleBlurCustom = (event: any, setError: any, error: any) => {
        setError(error);
        setLoginError('');
        handleBlur(event);
    };
    const handleChangeCustom = (event: any, setError: any) => {
        setError('');
        setLoginError('');
        handleChange(event);
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
                <Typography variant="h5" component="h1" mb={2}>
                    LOGIN
                </Typography>
                <TextInput
                    title="Username"
                    placeholder={'Enter username'}
                    name="username"
                    id="username"
                    value={values.username}
                    onBlur={(e) => {
                        handleBlurCustom(e, setUsernameError, errors.username);
                    }}
                    onChange={(e) => {
                        handleChangeCustom(e, setUsernameError);
                    }}
                    error={usernameError}
                    type={undefined}
                />
                <TextInput
                    title="Password"
                    placeholder={'Enter password'}
                    name="password"
                    type={'password'}
                    id="password"
                    value={values.password}
                    onBlur={(e) => {
                        handleBlurCustom(e, setPasswordError, errors.password);
                    }}
                    onChange={(e) => {
                        handleChangeCustom(e, setPasswordError);
                    }}
                    error={passwordError}
                />
                {loginError && <p className="login-error">{loginError}</p>}
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
                    Login
                </Button>
                <Typography variant="body1" component="p" py={1}>
                    Forgot password
                </Typography>
                {/* <Stack direction="row" alignItems="center" width="100%" justifyContent="space-between" py={1.4}>
                    <Divider sx={{ width: '35%' }} />
                    <Typography variant="caption" sx={{ color: '#ccc' }}>
                        Login with
                    </Typography>
                    <Divider sx={{ width: '35%' }} />
                </Stack> */}

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
}

export default Login;
