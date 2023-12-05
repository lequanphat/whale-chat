import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { userLogin } from '../../store/slices/authSlice';
import { useFormik } from 'formik';
import loginSchema from '../../schema/login';
import TextInput from '../../components/input/TextInput';
import ImageButton from '../../components/button/ImageButton';
import { userSelector } from '../../store/selector';
import { Typography, Button, Stack } from '@mui/material';
function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(userSelector);
    const [loginError, setLoginError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    useEffect(() => {
        if (user.auth) {
            navigate('/');
        } else {
            navigate('/login');
        }
    }, []);
    const { values, handleBlur, handleChange, errors } = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        initialErrors: {
            username: 'Please enter username',
            password: 'Please enter password',
        },
        validationSchema: loginSchema,
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
        const response = await dispatch(
            userLogin({
                username: values.username,
                password: values.password,
            }),
        );
        if (response.error) {
            setLoginError(response.payload.error);
            return;
        }
        navigate('/');
    };

    const googleLogin = async () => {
        window.open('http://localhost:2411/api/auth/login/google', '_self');
    };
    const handleBlurCustom = (event, setError, error) => {
        setError(error);
        setLoginError('');
        handleBlur(event);
    };
    const handleChangeCustom = (event, setError) => {
        setError('');
        setLoginError('');
        handleChange(event);
    };

    return (
        <div>
            <FormContainer>
                <img className="robot" src="/robot.gif" alt="" />
                <form onSubmit={(event) => handleLogin(event)}>
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
                    <div>
                        <Button type="submit" variant="contained" fullWidth>
                            Login
                        </Button>
                        <Typography variant="subtitle1" component="p" mb={1} mt={0.6}>
                            Forgot password
                        </Typography>
                    </div>
                    <div className="seperate">
                        <div></div>
                        <p>Login with</p>
                        <div></div>
                    </div>
                    <div className="login-with">
                        <ImageButton image={'google.png'} onClick={googleLogin}>
                            Login with google
                        </ImageButton>
                        <ImageButton image={'facebook.png'} onClick={googleLogin}>
                            Login with google
                        </ImageButton>
                        <ImageButton image={'github.png'} onClick={googleLogin}>
                            Login with google
                        </ImageButton>
                    </div>
                    <Stack direction="row" justifyContent="center" mt={3}>
                        <Typography variant="subtitle1" component="p" mr={0.5}>
                            You don't have an account?
                        </Typography>
                        <Typography variant="subtitle1" component="p" sx={{  color: 'var(--primary-color)', cursor: 'pointer' }} onClick={() => {navigate('/register')}}>
                            Register
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
        border-radius: 0.4rem;
        padding: 2.4rem 3.2rem;
    }
    .login-error {
        display: block;
        margin-bottom: 0.6rem;
        font-size: 1.5rem;
        color: rgba(231, 76, 60, 1);
    }
    
    .login-with {
        display: grid;
        grid-template-columns: 31% 31% 31%;
        justify-content: space-between;
    }
    .seperate {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 2rem;
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
`;

export default Login;
