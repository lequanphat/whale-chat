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
export const displayNameSchema = Joi.string()
    .pattern(new RegExp('^[^!@#$%^&*()=0-9/\\\\}{_+;:"\'><.,\\[\\]]+$'))
    .min(8)
    .max(20)
    .messages({
        'string.pattern.base': 'The name contains only letters and spaces',
        'string.min': 'The name must have at least 8 characters',
        'string.max': 'The name can only contain a maximum of 20 characters',
    })
    .custom((value, helpers) => {
        if (/\s{2,}/.test(value)) {
            return helpers.error('any.invalid');
        }
        return value;
    }, 'no-consecutive-spaces');
export const aboutSchema = Joi.string()
    .max(100)
    .allow('')
    .message('About can only contains a maximum of 100 characters');
export const registerSchema = Joi.object({
    displayName: displayNameSchema,
    email: Joi.string().email().message('Invalid email'),
    password: passwordSchema,
});

export const profileSchema = Joi.object({
    displayName: displayNameSchema,
    about: aboutSchema,
});
