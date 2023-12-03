import * as yup from 'yup';
const registerSchema = yup.object({
    username: yup
        .string()
        .matches(/^[a-zA-Z0-9]+$/, 'Username contains only letters and numbers')
        .min(8, 'Username must have at least 8 characters')
        .max(20, 'Username can only contain a maximun of 20 characters')
        .required('Please enter username'),
    email: yup.string().email('Incorrect email').required('Please enter email'),
    password: yup.string().min(8, 'Password must have at least 8 characters').max(20, 'Password can only contain a maximun of 20 characters').required('Please enter password'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Incorrect confirm password')
        .required('Please confirm password'),
});
export default registerSchema;
