import React, { useState } from 'react';
import styled from 'styled-components';

import { CreateComment } from './CreateComment';
import { Theme } from '../../../utils/theme.util';

type StyleProps = {
    theme: Theme;
    typeReply?: boolean;
    children: any;
};

const ReplyContent = styled.div`
    display: flex;
    flex-direction: column;
    margin: ${(props: StyleProps) => (props.typeReply ? null : '16px 0px')};
    margin-left: ${(props: StyleProps) => (props.typeReply ? '15px' : null)};
    margin-top: ${(props: StyleProps) => (props.typeReply ? '-10px' : null)};
    border-radius: 8px;
    background-color: ${({ typeReply, theme }: StyleProps) =>
        typeReply ? theme.gray200 : null};
    padding: ${(props: StyleProps) => (props.typeReply ? '14px' : null)};

    h5 {
        font-size: 15px;
        font-weight: 500;
        margin-bottom: 5px;
        color: ${(props) => props.theme.gray800};
    }
    span {
        font-weight: 500;
        font-size: 14px;
        color: ${(props) => props.theme.gray400};
    }
    p {
        margin-top: 7px;
        font-weight: 500;
        color: ${(props) => props.theme.gray500};
    }
`;

const UserInfoDate = styled.div`
    display: flex;
`;

const ReplyBtn = styled.button`
    display: flex;
    margin-top: 9px;
    padding: 8px 0px;
    width: 39px;

    font-size: 15px;
    font-weight: 500;
    color: ${(props) => props.theme.gray400};
    background-color: transparent;
    outline: none;
    transition: all 0.3s ease 0s;

    &:hover {
        color: ${(props) => props.theme.primary};
    }
`;

type CommentType = {
    id: number;
    postId: number;
    content: string;
    replyId?: number | null | undefined;
    author: {
        id: number;
        username: string;
    };
    createdAt: Date;
};

type AppProps = {
    isAuth: boolean;
    typeReply?: boolean;
    commentData: CommentType;
};

export function Reply({ isAuth, typeReply, commentData }: AppProps): JSX.Element {
    const [isReply, setReply] = useState(false);
    const rawDate = new Date(commentData.createdAt);
    const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    };
    const date = `${rawDate.toLocaleTimeString('en-us', options)}`;

    return (
        <ReplyContent typeReply={typeReply}>
            <UserInfoDate>
                <h5>XXX | {commentData.author.username}</h5>
                <span style={{ margin: '0px 4px' }}>•</span>
                <span>{date}</span>
            </UserInfoDate>
            <p>{commentData.content}</p>
            {isAuth ? (
                <>
                    {isReply ? (
                        <CreateComment
                            isReply={isReply}
                            cancelReply={(cancel: boolean) => setReply(cancel)}
                        />
                    ) : (
                        <ReplyBtn type='button' onClick={() => setReply(!isReply)}>
                            Reply
                        </ReplyBtn>
                    )}
                </>
            ) : null}
        </ReplyContent>
    );
}
