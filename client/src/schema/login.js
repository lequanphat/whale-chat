import * as yup from 'yup';
const loginSchema = yup.object({
    username: yup
        .string()
        .matches(/^[a-zA-Z]+$/, 'Tên đăng nhập chỉ được chứa các chữ cái')
        .min(8, 'Tên đăng nhập phải có ít nhất 8 ký tự')
        .max(20, 'Tên đăng nhập tối đa là 20 ký tự')
        .required('Vui lòng điền tên đăng nhập'),
    password: yup.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự').required('Vui lòng điền mật khẩu'),
});
export default loginSchema;
