import React from 'react';
import { Formik, useField } from 'formik';
import * as yup from 'yup';

import { AuthForm, AuthInput, AuthLabel } from '../shared-styles/auth.styles';

const validationSchema = yup.object().shape({
    email: yup
        .string()
        .email('You must enter a valid university email.')
        .required('Email is required.'),
    password: yup.string().required('Password is required.'),
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
            {({ handleSubmit, isSubmitting }) => (
                <AuthForm onSubmit={handleSubmit} isSubmitting={isSubmitting}>
                    <TextField
                        name='email'
                        id='email'
                        type='email'
                        placeholder='Enter your email'
                        label='Enter your email'
                    />
                    <TextField
                        name='password'
                        id='password'
                        type='password'
                        placeholder='Enter your password'
                        label='Enter your password'
                    />
                    <button type='submit'>Login</button>
                </AuthForm>
            )}
        </Formik>
    );
}
