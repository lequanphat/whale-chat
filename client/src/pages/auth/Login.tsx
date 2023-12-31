import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { loginSchema } from '../../schemas/Scheme';
import { Typography, Button, Stack } from '@mui/material';
import AuthSocial from './AuthSocial';
import AuthInput from '../../components/input/AuthInput';
import AuthContainer from './AuthContainer';
import { userLogin } from '../../store/slices/authSlice';
import { useDispatch } from 'react-redux';
import { openSuccessSnackbar } from '../../store/slices/appSlice';
interface FormValues {
  email: string;
  password: string;
}
const initialValues: FormValues = {
  email: '',
  password: '',
};
const initialErrors: FormValues = {
  email: 'Please enter your email',
  password: 'Please enter your password',
};
const Login = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { values, setValues, handleBlur, handleChange, errors } = useFormik({
    initialValues,
    initialErrors,
    validationSchema: loginSchema,
    onSubmit: undefined,
  });

  const handleLogin = async () => {
    // validate
    if (errors.password || errors.email) {
      if (errors.password) {
        setPasswordError(errors.password);
      }
      if (errors.email) {
        setEmailError(errors.email);
      }
      return;
    }
    const data = {
      email: values.email,
      password: values.password,
    };
    const response = await dispatch(userLogin(data));
    console.log(response);
    
    if (response.payload.error) {
      setLoginError(response.payload.error);
      return;
    }
    dispatch(openSuccessSnackbar('Login successfully!'));
  };

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
          title="Email"
          name="email"
          value={values.email}
          error={emailError}
          handleBlur={(e) => {
            handleBlurCustom(e, setEmailError, errors.email);
          }}
          handleChange={(e) => {
            handleChangeCustom(e, setEmailError);
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
          variant="body1"
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
