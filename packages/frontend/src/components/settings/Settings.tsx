import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik, useField } from 'formik';
import * as yup from 'yup';
import { FaTimes } from 'react-icons/fa';

import {
    Form,
    SubmitBtn,
    Input,
    Label,
    ErrorMsg,
    ThumbnailTitle,
    ThumbnailContent,
    DeleteBtn,
} from '../shared-styles/form.styles';
import { CardContainer } from '../shared-styles/global.styles';
import { setToken } from '../../utils/accessToken.util';
import { setAuth } from '../../store/actions/auth.action';
import { Filestack } from '../../utils/Filestack.util';
import defaultAvatar from '../../assets/images/default-avatar.png';
import {
    useMeQuery,
    useUpdateAccountMutation,
    useLogoutMutation,
    MeDocument,
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

const SettingsHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 25px;

    h2 {
        font-weight: 600;
        color: ${(props) => props.theme.gray800};
    }

    p {
        text-align: center;
        margin-top: 8px;
        letter-spacing: 0.2px;
        font-size: 15px;
        font-weight: 500;
        color: ${(props) => props.theme.gray500};
    }
`;

const ProfileAvatar = styled.img`
    height: 50px;
    width: 50px;
    border: none;
    border-radius: 8px;
    background-color: ${(props) => props.theme.gray300};
    margin: 7px 8px 8px 0px;
`;

const NoAccess = styled.div`
    cursor: not-allowed;
    opacity: 0.7;
    div {
        pointer-events: none;
    }
`;

const SubTitle = styled.h4`
    font-size: 14px !important;
    font-weight: 500;
    margin-top: 8px;
    color: ${(props) => props.theme.gray400};
`;

const validationSchema = yup.object().shape({
    password: yup
        .string()
        .min(6, 'Password must be at least 6 characters.')
        .max(100, 'Password cannot exceed 100 characters.'),
    newPassword: yup
        .string()
        .min(6, 'Password must be at least 6 characters.')
        .max(100, 'Password cannot exceed 100 characters.'),
});

const TextField = ({ placeholder, label, limited, ...props }: any) => {
    const [field, meta] = useField(props);
    const err = meta.error && meta.touched;

    return (
        <Label error={err} htmlFor={field.name}>
            {err ? meta.error : label}
            <br />
            {limited ? <SubTitle>Unable to change.</SubTitle> : null}
            <Input {...field} {...props} placeholder={placeholder} />
        </Label>
    );
};

type FormValues = {
    password: string;
    newPassword: string;
};

export function Settings(): JSX.Element | null {
    const [avatarSrc, setAvatar] = useState<string | null>(null);
    const dispatch = useDispatch();
    const history = useHistory();

    const { data, loading } = useMeQuery();
    const [updateAccount, { error }] = useUpdateAccountMutation();
    const [logout, { client }] = useLogoutMutation();

    const initValues: FormValues = { password: '', newPassword: '' };

    if (loading || !data || !data.me || typeof data.me === 'undefined') return null;

    const userAvatar = data.me.profileImg ? data.me.profileImg : defaultAvatar;

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
                                    profileImg: avatarSrc,
                                    currentPassword: values.password,
                                    newPassword: values.newPassword,
                                },
                                refetchQueries: [
                                    {
                                        query: MeDocument,
                                    },
                                ],
                            });

                            if (typeof success.data === 'undefined' || !success.data) {
                                throw new Error('Failed to update');
                            }

                            if (success.data.updateAccount) {
                                if (values.password && values.newPassword) {
                                    dispatch(setAuth(false));
                                    setSubmitting(false);
                                    await logout();
                                    setToken('');
                                    await client!.resetStore();
                                    history.push('/login');
                                }

                                setAvatar(null);
                            }
                        } catch (err) {
                            throw new Error('Failed to update account!');
                        }
                    }}
                >
                    {({ values, handleSubmit, isSubmitting }) => (
                        <Form onSubmit={handleSubmit} isSubmitting={isSubmitting}>
                            <ThumbnailTitle>Change your avatar</ThumbnailTitle>
                            {avatarSrc && <SubTitle>Be sure to save changes.</SubTitle>}
                            <ThumbnailContent>
                                <ProfileAvatar
                                    src={avatarSrc ?? userAvatar}
                                    alt='Avatar'
                                />
                                <Filestack
                                    getThumbnail={(link: string | null) =>
                                        setAvatar(link)
                                    }
                                />
                                {avatarSrc && (
                                    <DeleteBtn
                                        type='button'
                                        onClick={() => setAvatar(null)}
                                    >
                                        <FaTimes />
                                    </DeleteBtn>
                                )}
                            </ThumbnailContent>
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
                                name='newPassword'
                                id='newPassword'
                                type='password'
                                placeholder='Enter a new password'
                                label='Enter a new password'
                            />
                            {values.newPassword && (
                                <TextField
                                    name='password'
                                    id='password'
                                    type='password'
                                    placeholder='**********'
                                    label='Enter your current password'
                                />
                            )}
                            <SubmitBtn type='submit'>Update</SubmitBtn>
                        </Form>
                    )}
                </Formik>
            </SettingsContent>
        </SettingsContainer>
    );
}
