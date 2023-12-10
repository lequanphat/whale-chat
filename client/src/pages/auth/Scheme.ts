import * as yup from 'yup';
export const loginSchema = yup.object({
    username: yup.string().email('Email không hợp lệ').required('Vui lòng điền email'),
    password: yup.string().min(3, 'Mật khẩu phải có ít nhất 3 ký tự').required('Vui lòng điền mật khẩu'),
});

export const registerSchema = yup.object({
    username: yup
        .string()
        .test(
            'specialCharsAndNumbers',
            'Mật khẩu chỉ được chứa chữ cái và khoảng trắng!',
            (value) => !/[0-9!@#$%^&*(),.?":{}|<>]/.test(value),
        )
        .min(5, 'Tên không được ngắn hơn 4 kí tự!')
        .max(30, 'Tên không được dài quá 30 kí tự!')
        .required('Vui lòng điền tên của bạn!'),
    email: yup.string().email('Email không hợp lệ').required('Vui lòng điền email!'),
    password: yup.string().min(3, 'Mật khẩu phải có ít nhất 3 ký tự!').required('Vui lòng điền mật khẩu!'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Mật khẩu xác nhận không đúng!')
        .required('Vui lòng xác nhận mật khẩu'),
});
