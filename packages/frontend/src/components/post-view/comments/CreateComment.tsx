import React from 'react';
import styled from 'styled-components';
import { Formik, Field } from 'formik';

const CommentContainer = styled.div`
    margin-top: 15px;

    form {
        display: flex;
        flex-direction: column;
    }

    h3 {
        font-size: 17px;
        font-weight: 600;
        color: ${(props) => props.theme.gray800};
    }

    textarea {
        resize: none;
        border: 1px solid transparent;
        border-radius: 8px;
        box-sizing: border-box;

        font-weight: 500;
        font-size: 15px;

        height: 100px;
        width: 100%;
        padding: 10px;
        margin-top: 8px;
        outline: none;
        background-color: ${(props) => props.theme.gray200};
        transition: all 0.3s ease 0s;

        &:focus {
            height: 150px;
            border: 1px solid ${(props) => props.theme.gray300};
        }
    }

    button {
        display: flex;
        align-self: flex-end;
        margin-top: 9px;
        padding: 8px;

        font-size: 15px;
        font-weight: 500;
        color: ${(props) => props.theme.white};
        border-radius: 8px;
        background-color: ${(props) => props.theme.primary};
        outline: none;
        transition: all 0.3s ease 0s;

        &:hover {
            background-color: ${(props) => props.theme.darkPrimary};
        }
    }
`;

type AppProps = {
    isReply?: boolean;
};

type FormValues = {
    comment: string;
};

// TODO: Add required values like author id later
export function CreateComment({ isReply }: AppProps): JSX.Element {
    const initValues: FormValues = { comment: '' };

    return (
        <CommentContainer>
            {isReply ?? <h3>Add a new comment</h3>}
            <Formik
                initialValues={initValues}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true);
                    console.log('CreateComment.tsx', values);
                    setSubmitting(false);
                }}
            >
                {({ handleSubmit }) => (
                    <form onSubmit={handleSubmit}>
                        <Field
                            name='comment'
                            component='textarea'
                            placeholder='Write your response...'
                        />
                        <button type='submit'>{isReply ? 'Reply' : 'Comment'}</button>
                    </form>
                )}
            </Formik>
        </CommentContainer>
    );
}
