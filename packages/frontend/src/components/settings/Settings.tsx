import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik, useField } from 'formik';
import * as yup from 'yup';

import { Form, SubmitBtn, Input, Label, ErrorMsg } from '../shared-styles/form.styles';
import { CardContainer } from '../shared-styles/global.styles';
import { setToken } from '../../utils/accessToken.util';
import { setAuth } from '../../store/actions/auth.action';
import {
    useMeQuery,
    useUpdateAccountMutation,
    useLogoutMutation,
} from '../../generated/graphql';

const SettingsContainer = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 30px;
`;

const SettingsContent = styled.div`
    width: 370px;
    display: flex;
    justify-content: center;
    ${CardContainer}
`;

/* const SettingsHeader = styled.div` */
/*     height: 80px; */

/*     h1, */
/*     h2 { */
/*         font-weight: 600; */
/*         color: ${(props) => props.theme.gray800}; */
/*     } */
/* `; */

const SettingsHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 25px;

    h2 {
        font-weight: 600;
        color: ${(props) => props.theme.gray800};
        margin-bottom: 8px;
    }

    p {
        text-align: center;
        letter-spacing: 0.2px;
        font-size: 15px;
        font-weight: 500;
        color: ${(props) => props.theme.gray500};
    }
`;

const NoAccess = styled.div`
    cursor: not-allowed;
    opacity: 0.7;
    div {
        pointer-events: none;
    }
`;

const LimitedMsg = styled.h4`
    font-weight: 500;
    margin-top: 8px;
    color: ${(props) => props.theme.gray400};
`;

const validationSchema = yup.object().shape({
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters.')
        .max(100, 'Password cannot exceed 100 characters.')
        .required('Password is required.'),
    newPassword: yup
        .string()
        .min(6, 'Password must be at least 6 characters.')
        .max(100, 'Password cannot exceed 100 characters.')
        .required('Password is required.'),
});

const TextField = ({ placeholder, label, limited, ...props }: any) => {
    const [field, meta] = useField(props);
    const err = meta.error && meta.touched;

    return (
        <Label error={err} htmlFor={field.name}>
            {err ? meta.error : label}
            <br />
            {limited ? <LimitedMsg>Unable to change.</LimitedMsg> : null}
            <Input {...field} {...props} placeholder={placeholder} />
        </Label>
    );
};

type FormValues = {
    password: string;
    newPassword: string;
};

export function Settings(): JSX.Element | null {
    const { data, loading } = useMeQuery();
    const [updateAccount, { error }] = useUpdateAccountMutation();
    const [logout, { client }] = useLogoutMutation();

    const dispatch = useDispatch();
    const history = useHistory();

    const initValues: FormValues = { password: '', newPassword: '' };

    if (loading || !data || !data.me || typeof data.me === 'undefined') return null;

    return (
        <SettingsContainer>
            <SettingsContent>
                <SettingsHeader>
                    <h2>Manage Your Account</h2>
                </SettingsHeader>
                {error && <ErrorMsg>{error.graphQLErrors[0].message}</ErrorMsg>}
                <Formik
                    initialValues={initValues}
                    validationSchema={validationSchema}
                    onSubmit={async (values, { setSubmitting }) => {
                        setSubmitting(true);
                        try {
                            const success = await updateAccount({
                                variables: {
                                    userId: data.me!.id,
                                    currentPassword: values.password,
                                    newPassword: values.newPassword,
                                },
                            });

                            if (typeof success.data === 'undefined' || !success.data) {
                                throw new Error('Failed to update');
                            }

                            if (success.data.updateAccount) {
                                dispatch(setAuth(false));
                                setSubmitting(false);
                                await logout();
                                setToken('');
                                await client!.resetStore();
                                history.push('/login');
                            }
                        } catch (err) {
                            throw new Error('Failed to update account!');
                        }
                    }}
                >
                    {({ handleSubmit, isSubmitting }) => (
                        <Form onSubmit={handleSubmit} isSubmitting={isSubmitting}>
                            <NoAccess>
                                <div>
                                    <TextField
                                        name='username'
                                        id='username'
                                        type='text'
                                        placeholder={data.me!.username}
                                        label='Username'
                                        limited
                                    />
                                </div>
                            </NoAccess>
                            <NoAccess>
                                <div>
                                    <TextField
                                        name='email'
                                        id='email'
                                        type='email'
                                        placeholder={data.me!.email}
                                        label='Email'
                                        limited
                                    />
                                </div>
                            </NoAccess>
                            <TextField
                                name='password'
                                id='password'
                                type='password'
                                placeholder='**********'
                                label='Enter your current password'
                            />
                            <TextField
                                name='newPassword'
                                id='newPassword'
                                type='password'
                                placeholder='Enter a new password'
                                label='Enter a new password'
                            />
                            <SubmitBtn type='submit'>Update</SubmitBtn>
                        </Form>
                    )}
                </Formik>
            </SettingsContent>
        </SettingsContainer>
    );
}
