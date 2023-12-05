import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useFormik } from 'formik';
import registerSchema from '../../schema/register';
import TextInput from '../../components/input/TextInput';
import Button from '@mui/material/Button';
import ImageButton from '../../components/button/ImageButton';
import { useDispatch, useSelector } from 'react-redux';
import { userRegister } from '../../store/slices/authSlice';
import { userSelector } from '../../store/selector';
import { Stack, Typography } from '@mui/material';
function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(userSelector);
    const [registerError, setRegisterError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setconfirmPasswordError] = useState('');
    const [emailError, setEmailError] = useState('');
    const { values, errors, handleBlur, handleChange } = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
        initialErrors: {
            username: 'Please enter username',
            email: 'Please enter email',
            password: 'Please enter password',
            confirmPassword: 'Please enter password',
        },
        validationSchema: registerSchema,
    });

    useEffect(() => {
        if (user.auth) {
            navigate('/');
        } else {
            navigate('/register');
        }
    }, []);

    const handleRegister = async (e) => {
        e.preventDefault();
        // validate
        if (errors.password || errors.username || errors.confirmPassword || errors.email) {
            if (errors.password) {
                setPasswordError(errors.password);
            }
            if (errors.username) {
                setUsernameError(errors.username);
            }
            if (errors.email) {
                setEmailError(errors.email);
            }
            if (errors.confirmPassword) {
                setconfirmPasswordError(errors.confirmPassword);
            }
            return;
        }
        // call api

        const { username, email, password, confirmPassword } = values;
        const response = await dispatch(userRegister({ username, email, password, confirmPassword }));
        if (response.error) {
            setRegisterError(response.payload.error);
            return;
        }
        console.log(response);
        navigate('/set-avatar/' + response.payload._id);
    };
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
        <div>
            <FormContainer>
                <img className="robot" src="/robot.gif" alt="" />
                <form onSubmit={(event) => handleRegister(event)}>
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
                    <Button type="submit" variant="contained" fullWidth>
                        Register
                    </Button>
                    <div className="seperate">
                        <div></div>
                        <p>Login with</p>
                        <div></div>
                    </div>
                    <div className="login-with">
                        <ImageButton image={'google.png'}>Login with google</ImageButton>
                        <ImageButton image={'facebook.png'}>Login with google</ImageButton>
                        <ImageButton image={'github.png'}>Login with google</ImageButton>
                    </div>
                    <Stack direction="row" justifyContent="center" mt={3}>
                        <Typography variant="subtitle1" component="p" mr={0.5}>
                            You already have an account?
                        </Typography>
                        <Typography variant="subtitle1" component="p" sx={{  color: 'var(--primary-color)', cursor: 'pointer' }} onClick={() => {navigate('/login')}}>
                            Login
                        </Typography>
                    </Stack>
                </form>
            </FormContainer>
        </div>
    );
}

const FormContainer = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    gap: 1rem;
    align-items: center;
    background-color: #40407a;
    .robot {
        width: 40%;
    }
    form {
        width: 42rem;
        background-color: white;
        border-radius: 0.8rem;
        padding: 2.4rem 3.2rem;
    }
    .register-error {
        display: block;
        margin-bottom: 0.6rem;
        font-size: 1.5rem;
        color: rgba(231, 76, 60, 1);
    }
    .seperate {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 2rem 0;
        div {
            flex: 1;
            height: 1px;
            background-color: #bdc3c7;
        }
        p {
            display: block;
            color: #7f8c8d;
            font-size: 1.5rem;
            padding: 0 1rem;
        }
    }
    .login-with {
        display: grid;
        grid-template-columns: 31% 31% 31%;
        justify-content: space-between;
    }
`;

export default Register;
