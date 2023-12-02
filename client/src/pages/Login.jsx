import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { login } from '../api/internal';
import { setUser } from '../store/slices/userSlice';
import { useFormik } from 'formik';
import loginSchema from '../schema/login';
import TextInput from '../components/input/TextInput';
import Button from '../components/button/Button';
import ImageButton from '../components/button/ImageButton';
function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const { values, handleBlur, handleChange, errors } = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        initialErrors: {
            username: 'Vui lòng điền trường này',
            password: 'Vui lòng điền trường này',
        },
        validationSchema: loginSchema,
    });
    useEffect(() => {
        if (localStorage.getItem('chat-app-user')) {
            const user = JSON.parse(localStorage.getItem('chat-app-user'));
            const { username, email } = user;
            const id = user._id;
            const avatar = user.avatarImage;
            dispatch(setUser({ username, email, id, avatar, auth: true }));
            navigate('/');
        }
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('submit');
        const { username, password } = values;
        const response = await login({
            username,
            password,
        });
        console.log(response);
        if (response.data.status === false) {
            alert(response.msg);
            return;
        }
        localStorage.setItem('chat-app-user', JSON.stringify(response.data.user));
        const { _id, avatarImage, email } = response.data.user;
        dispatch(setUser({ username, email, id: _id, avatar: avatarImage, auth: true }));
        navigate('/');
    };

    const googleLogin = async () => {
        window.open('http://localhost:2411/api/auth/login/google', '_self');
    };
    // const resetLogin = () => {
    //     setEmailError('');
    //     setPasswordError('');
    //     setLoginError('');
    // };
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
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="header">
                        <h1>Login</h1>
                    </div>
                    <TextInput
                        title="Username"
                        placeholder={'Username'}
                        name="username"
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
                        value={values.password}
                        onBlur={(e) => {
                            handleBlurCustom(e, setPasswordError, errors.password);
                        }}
                        onChange={(e) => {
                            handleChangeCustom(e, setPasswordError);
                        }}
                        error={passwordError}
                    />

                    <div>
                        <Button type="submit">Login</Button>
                        <p className="forgot-password">Quên mật khẩu</p>
                    </div>

                    <div className="login-with">
                        <div className="seperate">
                            <div></div>
                            <p>Login with</p>
                            <div></div>
                        </div>

                        <ImageButton image={'google.png'} name={'Google'} onClick={googleLogin}>
                            Login with google
                        </ImageButton>
                        <ImageButton image={'facebook.png'} name={'facebook'} onClick={googleLogin}>
                            Login with google
                        </ImageButton>
                    </div>
                    <span className="footer">
                        You don't have an account?<Link to="/register">Register</Link>
                    </span>
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
    .header h1 {
        text-transform: uppercase;
        font-size: 2.4rem;
        margin-bottom: 2rem;
        color: #2c3e50;
    }
    form {
        width: 42rem;
        background-color: white;
        border-radius: 0.4rem;
        padding: 2.4rem 3.2rem;
    }
    .forgot-password {
        margin: 1rem 0;
        font-size: 1.5rem;

        color: #7f8c8d;
        cursor: pointer;
        transition: 0.2s;
        &:hover {
            color: #1abc9c;
        }
    }
    .login-with {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
    .seperate {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 1rem;
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
    .footer {
        display: block;
        margin-top: 2rem;
        font-size: 1.5rem;
        text-align: center;
        a {
            text-decoration: none;
            color: #1abc9c;
            margin: 0.4rem;
        }
    }
`;

export default Login;
