import React from 'react';
import { Formik, useField } from 'formik';
import * as yup from 'yup';

import { AuthForm, AuthInput, AuthLabel } from '../shared-styles/auth.styles';

const validationSchema = yup.object().shape({
    email: yup
        .string()
        .email('You must use a valid university email.')
        .required('Email is required.'),
    password: yup.string().required('Password is required.'),
});

const TextField = ({ placeholder, label, ...props }: any) => {
    const [field, meta] = useField(props);
    const err = meta.error && meta.touched;

    return (
        <AuthLabel error={err} htmlFor={field.name}>
            {label}
            <AuthInput {...field} {...props} placeholder={placeholder} />
            <h1>{err}</h1>
        </AuthLabel>
    );
};

export function Login(): JSX.Element {
    const initValues = {
        email: '',
        password: '',
    };

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
            {({ values, errors, handleSubmit }) => (
                <AuthForm onSubmit={handleSubmit}>
                    <TextField
                        name='email'
                        id='email'
                        type='email'
                        placeholder='Enter your email'
                        label={errors.email ?? 'Enter your email'}
                        value={values.email}
                    />
                    <TextField
                        name='password'
                        id='password'
                        type='password'
                        placeholder='Enter your password'
                        label={errors.password ?? 'Enter your password'}
                        value={values.password}
                    />
                    <button type='submit'>Login</button>
                </AuthForm>
            )}
        </Formik>
    );
}
