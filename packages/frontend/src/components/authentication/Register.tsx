import React from 'react';
import { Formik, useField } from 'formik';
import * as yup from 'yup';

import { AuthForm, AuthInput, AuthLabel } from '../shared-styles/auth.styles';

type FormValues = {
    email: string;
    password: string;
    confirmPassword: string;
};

const validationSchema = yup.object().shape({
    email: yup
        .string()
        .email('You must use a valid university email.')
        .required('University email is required.'),
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters.')
        .max(100, 'Password cannot exceed 100 characters.')
        .required('Password is required.'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match.')
        .required('You must confirm your password.'),
});

const TextField = ({ placeholder, label, ...props }: any) => {
    const [field, meta] = useField(props);
    const err = meta.error && meta.touched;

    return (
        <AuthLabel error={err} htmlFor={field.name}>
            {err ? meta.error : label}
            <AuthInput {...field} {...props} placeholder={placeholder} />
        </AuthLabel>
    );
};

export function Register(): JSX.Element {
    const initValues: FormValues = { email: '', password: '', confirmPassword: '' };

    return (
        <Formik
            initialValues={initValues}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                console.log('Submit values: ', values);
                setSubmitting(false);
            }}
        >
            {({ handleSubmit }) => (
                <AuthForm onSubmit={handleSubmit}>
                    <TextField
                        name='email'
                        id='email'
                        type='email'
                        placeholder='Enter your email'
                        label='Enter your university email'
                    />
                    <TextField
                        name='password'
                        id='password'
                        type='password'
                        placeholder='Enter your password'
                        label='Enter your password'
                    />
                    <TextField
                        name='confirmPassword'
                        id='confirmPassword'
                        type='password'
                        placeholder='Confirm your password'
                        label='Confirm your password'
                    />
                    <button type='submit'>Sign Up</button>
                </AuthForm>
            )}
        </Formik>
    );
}
