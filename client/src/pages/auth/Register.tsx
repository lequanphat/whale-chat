import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import { registerSchema } from '../../schemas/Scheme';
import Button from '@mui/material/Button';
import { Stack, Typography } from '@mui/material';
import AuthInput from '../../components/input/AuthInput';
import AuthContainer from './AuthContainer';
import AuthSocial from './AuthSocial';
import { userRegister } from '../../store/slices/authSlice';
import { useDispatch } from 'react-redux';
interface FormValues {
  displayName: string;
  email: string;
  password: string;
}
const initialValues: FormValues = {
  email: '',
  password: '',
  displayName: '',
};
const initialErrors: FormValues = {
  email: 'Please enter your email',
  password: 'Please enter your password',
  displayName: 'Please enter your name',
};
function Register() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const [registerError, setRegisterError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [displayNameError, setdisplayNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const { values, errors, handleBlur, handleChange } = useFormik({
    initialValues,
    initialErrors,
    validationSchema: registerSchema,
    onSubmit: (values) => {
      console.log('Form submitted with values:', values);
    },
  });

  const handleRegister = async () => {
    // validate
    if (errors.password || errors.displayName || errors.email) {
      if (errors.password) {
        setPasswordError(errors.password);
      }
      if (errors.email) {
        setEmailError(errors.email);
      }
      if (errors.displayName) {
        setdisplayNameError(errors.displayName);
      }
      return;
    }
    // call api
    const data = {
      displayName: values.displayName,
      email: values.email,
      password: values.password,
    };
    const response = await dispatch(userRegister(data));
    if (response.payload.error) {
      setRegisterError(response.payload.error);
      return;
    }
    navigate('/auth/verify-email');
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
    <AuthContainer title="REGISTER">
      <>
        <AuthInput
          title="Your name"
          name="displayName"
          value={values.displayName}
          error={displayNameError}
          handleBlur={(e) => {
            handleBlurCustom(e, setdisplayNameError, errors.displayName);
          }}
          handleChange={(e) => {
            handleChangeCustom(e, setdisplayNameError);
          }}
        />
        <AuthInput
          title="Email address"
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
          name="password"
          value={values.password}
          error={passwordError}
          handleBlur={(e) => {
            handleBlurCustom(e, setPasswordError, errors.password);
          }}
          handleChange={(e) => {
            handleChangeCustom(e, setPasswordError);
          }}
        />

        {registerError && (
          <Typography variant="body1" color={'#e74c3c'} fontSize={14} pb={1}>
            *{registerError}
          </Typography>
        )}
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
          onClick={handleRegister}
        >
          JOIN NOW
        </Button>
        <AuthSocial />
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
      </>
    </AuthContainer>
  );
}

export default Register;
