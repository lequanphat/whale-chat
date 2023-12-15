import * as yup from 'yup';

const usernameValidation = yup
    .string()
    .matches(/^[a-zA-Z0-9]+$/, 'Username must only have number and characters')
    .min(10, 'Username must have at least 10 characters')
    .max(25, 'Username must not exceed 25 charecters')
    .required('Please enter your username');

const passwordValidation = yup
    .string()
    .min(6, 'Password must have at least 6 characters')
    .max(20, 'Password must not exceed 20 characters')
    .required('Please enter your password');

export const loginSchema = yup.object({
    username: usernameValidation,
    password: passwordValidation,
});

export const registerSchema = yup.object({
    username: usernameValidation,
    email: yup.string().email('Invalid email').required('Please enter your email'),
    password: passwordValidation,
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Invalid confirm password')
        .required('Please enter your confirm password'),
});

export const forgotPasswordSchema = yup.object({
    email: yup.string().email('Invalid email').required('Please enter your email'),
});
export const resetPasswordSchema = yup.object({
    password: passwordValidation,
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Invalid confirm password')
        .required('Please enter your confirm password'),
});
