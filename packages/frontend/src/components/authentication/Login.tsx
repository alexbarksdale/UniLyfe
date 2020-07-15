import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, useField } from 'formik';
import * as yup from 'yup';
import { History } from 'history';

import { Form, Input, Label } from '../shared-styles/form.styles';
import { useLoginMutation, MeDocument, MeQuery } from '../../generated/graphql';
import { setToken } from '../../utils/accessToken.util';
import { setAuth } from '../../store/actions/auth.action';
import { setBrowsing } from '../../store/actions/navigation.action';
import { ErrorMsg } from './Authentication';

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

type AppProps = {
    history: History;
};

type FormValues = {
    email: string;
    password: string;
};

export function Login({ history }: AppProps): JSX.Element {
    const [login] = useLoginMutation();

    const dispatch = useDispatch();
    const [authErrors, setErrors] = useState<Object>();

    const initValues: FormValues = {
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
                    const { data } = await login({
                        variables: {
                            email: values.email,
                            password: values.password,
                        },
                        update: (store, { data }): void | null => {
                            if (data) {
                                store.writeQuery<MeQuery>({
                                    query: MeDocument,
                                    data: {
                                        me: data.login.user,
                                    },
                                });
                            }
                            return null;
                        },
                    });

                    if (data && data.login.accessToken) {
                        setSubmitting(false);
                        setToken(data.login.accessToken);
                        dispatch(setAuth(true));
                        dispatch(setBrowsing(true));
                        history.push('/');
                    }
                } catch (err) {
                    setErrors(err);
                }
            }}
        >
            {({ handleSubmit, isSubmitting }) => (
                <>
                    {authErrors && (
                        <ErrorMsg>Invalid email or password. Please try again.</ErrorMsg>
                    )}
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
                </>
            )}
        </Formik>
    );
}
