import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    email: Yup.string()
        .email('Email tidak valid')
        .required('Email harus diisi'),
    password: Yup.string()
        .min(8, 'Password minimal 8 karakter')
        .required('Password harus diisi'),
});


export const registerSchema = Yup.object().shape({
    email: Yup.string()
        .email('Email tidak valid')
        .required('Email harus diisi'),
    first_name: Yup.string()
        .required('Nama depan harus diisi'),
    last_name: Yup.string()
        .required('Nama belakang harus diisi'),
    password: Yup.string()
        .min(8, 'Password minimal 8 karakter')
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            'Password harus mengandung huruf besar, huruf kecil, dan angka'
        )
        .required('Password harus diisi'),
    confirm_password: Yup.string()
        .oneOf([Yup.ref('password')], 'Password tidak sama')
        .required('Konfirmasi password harus diisi'),
});