import React from 'react';
import styled from 'styled-components';
import { Formik, Field } from 'formik';

import { Theme } from '../../../utils/theme.util';
import {
    useCreateCommentMutation,
    useMeQuery,
    GetPostCommentsDocument,
} from '../../../generated/graphql';

type StyleProps = {
    theme: Theme;
    isReply?: boolean;
    children?: string;
};

const CommentContainer = styled.div`
    margin-top: 15px;

    form {
        display: flex;
        flex-direction: column;

        div {
            display: flex;
            justify-content: flex-end;
        }
    }

    h3 {
        font-size: 17px;
        font-weight: 600;
        color: ${(props) => props.theme.gray800};
    }
`;

const StyledTextArea = styled.textarea`
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
    background-color: ${({ theme }: StyleProps) => theme.gray200};
    border: 1px solid transparent;
    transition: all 0.3s ease 0s;

    &:focus {
        border: 1px solid ${({ theme }: StyleProps) => theme.gray300};
    }
`;

const StyledBtn = styled.button`
    display: flex;
    align-self: flex-end;
    margin-top: 9px;
    padding: 8px;

    font-size: 15px;
    font-weight: 500;
    color: ${({ isReply, theme }: StyleProps) =>
        isReply ? theme.gray400 : theme.white} !important;
    border-radius: 8px;
    background-color: ${({ isReply, theme }: StyleProps) =>
        isReply ? 'transparent' : theme.primary} !important;
    outline: none;
    transition: all 0.3s ease 0s;
    margin-left: 9px;

    &:hover {
        color: ${({ isReply, theme }: StyleProps) =>
            isReply ? theme.error : theme.white} !important;
        background-color: ${({ isReply, theme }: StyleProps) =>
            isReply ? 'transparent' : theme.darkPrimary} !important;
    }
`;

type FormValues = {
    comment: string;
};

type AppProps = {
    isReply?: boolean;
    postId: number;
    replyId?: number;
    cancelReply?: (b: boolean) => void;
};

export function CreateComment({
    isReply,
    postId,
    replyId,
    cancelReply,
}: AppProps): JSX.Element | null {
    const { data: meData, loading } = useMeQuery();
    const [createComment] = useCreateCommentMutation();

    if (!meData || loading) return null;

    const initValues: FormValues = { comment: '' };

    return (
        <CommentContainer>
            {isReply ?? <h3>Add a new comment</h3>}
            <Formik
                initialValues={initValues}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                    setSubmitting(true);

                    if (meData.me) {
                        const { data } = await createComment({
                            variables: {
                                postId,
                                replyId,
                                authorId: meData.me.id,
                                content: values.comment,
                            },
                            refetchQueries: [
                                {
                                    query: GetPostCommentsDocument,
                                    variables: {
                                        postId,
                                    },
                                },
                            ],
                        });

                        if (data) {
                            setSubmitting(false);
                            resetForm({});
                        }
                    }
                }}
            >
                {({ handleSubmit, values }) => (
                    <form onSubmit={handleSubmit}>
                        <Field
                            name='comment'
                            placeholder='Write your response...'
                            value={values.comment}
                            isReply={isReply}
                            as={StyledTextArea}
                        />
                        <h1>{values.comment}</h1>
                        <div>
                            {isReply ? (
                                <StyledBtn
                                    isReply={isReply}
                                    onClick={() => cancelReply!(false)}
                                >
                                    Cancel
                                </StyledBtn>
                            ) : null}
                            <StyledBtn type='submit'>
                                {isReply ? 'Reply' : 'Comment'}
                            </StyledBtn>
                        </div>
                    </form>
                )}
            </Formik>
        </CommentContainer>
    );
}
