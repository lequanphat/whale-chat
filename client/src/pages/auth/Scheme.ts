import * as yup from 'yup';

const emailValidation = yup.string().email('Invalid email').required('Please enter your email');

const passwordValidation = yup
    .string()
    .min(6, 'Password must have at least 6 characters')
    .max(20, 'Password must not exceed 20 characters')
    .matches(/^[a-zA-Z0-9]{6,20}$/, 'Password only contains number and characters')
    .required('Please enter your password');

const confirmPasswordValidation = yup
    .string()
    .oneOf([yup.ref('password')], 'Password must match')
    .required('Please enter your confirm password');

export const loginSchema = yup.object({
    email: emailValidation,
    password: passwordValidation,
});

export const registerSchema = yup.object({
    email: emailValidation,
    password: passwordValidation,
    confirmPassword: confirmPasswordValidation,
});

export const forgotPasswordSchema = yup.object({
    email: emailValidation,
});
export const resetPasswordSchema = yup.object({
    password: passwordValidation,
    confirmPassword: confirmPasswordValidation,
});
