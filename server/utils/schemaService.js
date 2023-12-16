import Joi from 'joi';
// validate with joi

// const usernameValidation = yup
//     .string()
//     .matches(/^[a-zA-Z0-9]+$/, 'Username must only have number and characters')
//     .min(10, 'Username must have at least 10 characters')
//     .max(25, 'Username must not exceed 25 charecters')
//     .required('Please enter your username');

// const passwordValidation = yup
//     .string()
//     .min(6, 'Password must have at least 6 characters')
//     .max(20, 'Password must not exceed 20 characters')
//     .required('Please enter your password');
export const passwordSchema = Joi.string()
    .min(6)
    .max(20)
    .pattern(new RegExp(/^[a-zA-Z0-9]{6,20}$/))
    .message('Invalid password');

export const registerSchema = Joi.object({
    email: Joi.string().email().message('Invalid email'),
    password: passwordSchema,
});
