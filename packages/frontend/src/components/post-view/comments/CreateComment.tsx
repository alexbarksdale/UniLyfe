import React from 'react';
import styled from 'styled-components';
import { Formik, Field } from 'formik';
import { Theme } from '../../../utils/theme.util';

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
    background-color: ${({ isReply, theme }: StyleProps) =>
        isReply ? theme.gray300 : theme.gray200};
    border: 1px solid
        ${({ isReply, theme }: StyleProps) => (isReply ? theme.gray350 : 'none')};
    transition: all 0.3s ease 0s;

    &:focus {
        height: 150px;
        border: 1px solid
            ${({ isReply, theme }: StyleProps) =>
                isReply ? theme.gray400 : theme.gray300};
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

type AppProps = {
    isReply?: boolean;
    cancelReply?: (b: boolean) => void;
};

type FormValues = {
    comment: string;
};

// TODO: Add required values like author id later
export function CreateComment({ isReply, cancelReply }: AppProps): JSX.Element {
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
                            placeholder='Write your response...'
                            isReply={isReply}
                            as={StyledTextArea}
                        />
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
