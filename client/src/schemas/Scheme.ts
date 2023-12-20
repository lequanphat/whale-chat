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

const displayNameValidation = yup
    .string()
    .matches(/^[^!@#$%^&*()=0-9/\\}{_+;:"'><.,\][]+$/, 'The name contains only letters and spaces')
    .min(8, 'The name must have at least 8 characters')
    .max(20, 'The name can only contain a maximum of 20 characters')
    .test('no-consecutive-spaces', 'There are no consecutive spaces', (value) => !/\s{2,}/.test(value));

export const loginSchema = yup.object({
    email: emailValidation,
    password: passwordValidation,
});

export const registerSchema = yup.object({
    email: emailValidation,
    password: passwordValidation,
    displayName: displayNameValidation,
});

export const forgotPasswordSchema = yup.object({
    email: emailValidation,
});
export const resetPasswordSchema = yup.object({
    password: passwordValidation,
    confirmPassword: confirmPasswordValidation,
});

export const editProfileSchema = yup.object({
    displayName: displayNameValidation,
    about: yup.string().max(100, 'About can only contain a maximum of 100 characters'),
});
