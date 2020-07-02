import React from 'react';
import { Formik, useField } from 'formik';
import * as yup from 'yup';

import { Form, Input, Label } from '../shared-styles/form.styles';
import { useLoginMutation } from '../../generated/graphql';
import { setToken } from '../../utils/accessToken.util';

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
        <Label error={err} htmlFor={field.name}>
            {err ? meta.error : label}
            <Input {...field} {...props} placeholder={placeholder} />
        </Label>
    );
};

export function Login(): JSX.Element {
    const [login] = useLoginMutation();

    const initValues = {
        email: '',
        password: '',
    };

    return (
        <Formik
            initialValues={initValues}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);

                try {
                    const res = await login({
                        variables: {
                            email: values.email,
                            password: values.password,
                        },
                    });

                    if (res.data && res.data.login.accessToken) {
                        console.log(res.data.login.accessToken);
                        setSubmitting(false);
                        setToken(res.data.login.accessToken);
                    }
                } catch (err) {
                    console.log(err);
                }

                // TODO: Handle error
            }}
        >
            {({ handleSubmit, isSubmitting }) => (
                <Form onSubmit={handleSubmit} isSubmitting={isSubmitting}>
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
                </Form>
            )}
        </Formik>
    );
}
