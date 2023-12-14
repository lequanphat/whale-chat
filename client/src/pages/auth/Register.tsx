import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { registerSchema } from './Scheme';
import TextInput from '../../components/input/TextInput';
import Button from '@mui/material/Button';
import { Box, Stack, Typography } from '@mui/material';
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
    username: 'Please enter username',
    email: 'Please enter email',
    password: 'Please enter password',
    confirmPassword: 'Please enter password',
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
                <Typography variant="h5" component="h1" mb={2}>
                    Register
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
                    title="Email"
                    placeholder={'Eg.nguyenvana@gmail.com'}
                    name="email"
                    id="email"
                    value={values.email}
                    onBlur={(e) => {
                        handleBlurCustom(e, setEmailError, errors.email);
                    }}
                    onChange={(e) => {
                        handleChangeCustom(e, setEmailError);
                    }}
                    error={emailError}
                    type={undefined}
                />
                <TextInput
                    type={'password'}
                    title="Password"
                    placeholder={'Enter password'}
                    name="password"
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
                <TextInput
                    type={'password'}
                    title="Confirm Password"
                    placeholder={'Enter confirm password'}
                    name="confirmPassword"
                    id="confirmPassword"
                    value={values.confirmPassword}
                    onBlur={(e) => {
                        handleBlurCustom(e, setconfirmPasswordError, errors.confirmPassword);
                    }}
                    onChange={(e) => {
                        handleChangeCustom(e, setconfirmPasswordError);
                    }}
                    error={confirmPasswordError}
                />
                {registerError && <p className="register-error">{registerError}</p>}
                <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
                    Register
                </Button>
                {/* <Stack direction="row" alignItems="center" width="100%" justifyContent="space-between" py={1.4}>
                    <Divider sx={{ width: '35%' }} />
                    <Typography variant="caption" sx={{ color: '#ccc' }}>
                        Login with
                    </Typography>
                    <Divider sx={{ width: '35%' }} />
                </Stack> */}
                <Stack direction="row" justifyContent="center" alignItems="center" mt={3}>
                    <Typography variant="body1" component="p" mr={0.5}>
                        You already have an account?
                    </Typography>
                    <Typography
                        variant="body2"
                        component="p"
                        sx={{ color: 'var(--primary-color)', cursor: 'pointer' }}
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
