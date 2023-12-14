import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { registerSchema } from './Scheme';
import Button from '@mui/material/Button';
import { Box, Stack, Typography } from '@mui/material';
import logo from '../../assets/logo.png';
import AuthInput from '../../components/input/AuthInput';
interface FormValues {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}
const initialValues: FormValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
};
const initialErrors: FormValues = {
    username: 'Please enter your username',
    email: 'Please enter your email',
    password: 'Please enter your password',
    confirmPassword: 'Please enter your password',
};
function Register() {
    const navigate = useNavigate();
    const [registerError, setRegisterError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setconfirmPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const { values, errors, handleBlur, handleChange } = useFormik({
        initialValues,
        initialErrors,
        validationSchema: registerSchema,
        onSubmit: (values) => {
            console.log('Form submitted with values:', values);
        },
    });

    // const handleRegister = async () => {
    //     e.preventDefault();
    //     // validate
    //     if (errors.password || errors.username || errors.confirmPassword || errors.email) {
    //         if (errors.password) {
    //             setPasswordError(errors.password);
    //         }
    //         if (errors.username) {
    //             setUsernameError(errors.username);
    //         }
    //         if (errors.email) {
    //             setEmailError(errors.email);
    //         }
    //         if (errors.confirmPassword) {
    //             setconfirmPasswordError(errors.confirmPassword);
    //         }
    //         return;
    //     }
    //     // call api
    //     const { username, email, password, confirmPassword } = values;
    //     const response = await dispatch(userRegister({ username, email, password, confirmPassword }));
    //     if (response.error) {
    //         setRegisterError(response.payload.error);
    //         return;
    //     }
    //     console.log(response);
    //     navigate('/set-avatar/' + response.payload._id);
    // };
    const handleBlurCustom = (event, setError, error) => {
        setError(error);
        setRegisterError('');
        handleBlur(event);
    };
    const handleChangeCustom = (event, setError) => {
        setError('');
        setRegisterError('');
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
                    width: '24rem',
                    backgroundColor: 'white',
                    borderRadius: 1,
                    boxShadow: 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
                }}
            >
                <Stack direction="row" alignItems="center" spacing={1} justifyContent="start" pb={4}>
                    <img src={logo} alt="logo" style={{ width: 60, height: 60 }} />
                    <Typography variant="h5" component="h1" color={'#3498db'}>
                        REGISTER
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
                    title="Email"
                    name="email"
                    value={values.email}
                    error={emailError}
                    type={undefined}
                    handleBlur={(e) => {
                        handleBlurCustom(e, setEmailError, errors.email);
                    }}
                    handleChange={(e) => {
                        handleChangeCustom(e, setEmailError);
                    }}
                />
                <AuthInput
                    title="Password"
                    name="password"
                    value={values.password}
                    error={passwordError}
                    type={undefined}
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
                    value={values.confirmPassword}
                    error={confirmPasswordError}
                    type={undefined}
                    handleBlur={(e) => {
                        handleBlurCustom(e, setconfirmPasswordError, errors.confirmPassword);
                    }}
                    handleChange={(e) => {
                        handleChangeCustom(e, setconfirmPasswordError);
                    }}
                />
                {registerError && <p className="register-error">{registerError}</p>}
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
                    JOIN NOW
                </Button>

                <Stack direction="row" justifyContent="center" alignItems="center" mt={3}>
                    <Typography variant="body1" component="p" mr={0.5}>
                        You already have an account?
                    </Typography>
                    <Typography
                        variant="body2"
                        component="p"
                        sx={{ color: '#3498db', cursor: 'pointer' }}
                        onClick={() => {
                            navigate('/auth/login');
                        }}
                    >
                        Login
                    </Typography>
                </Stack>
            </Box>
        </Box>
    );
}

export default Register;
