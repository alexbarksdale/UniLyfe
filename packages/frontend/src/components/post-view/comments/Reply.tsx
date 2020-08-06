import React, { useState } from 'react';
import styled from 'styled-components';

import { CreateComment } from './CreateComment';
import { Theme } from '../../../utils/theme.util';
import { CommentType } from '../types/comment.type';
import { ProfileAvatar } from '../../shared-styles/post.styles';
import defaultAvatar from '../../../assets/images/default-avatar.png';

type StyleProps = {
    theme: Theme;
    typeReply?: boolean;
    isAuth: boolean;
    children: any;
};

const ReplyContent = styled.div`
    display: flex;
    flex-direction: column;
    margin: ${({ typeReply }: StyleProps) => (typeReply ? null : '16px 0px')};
    margin-left: ${({ typeReply }: StyleProps) => (typeReply ? '15px' : null)};
    margin-top: ${({ typeReply }: StyleProps) => (typeReply ? '-10px' : null)};
    margin-bottom: ${({ isAuth }: StyleProps) => (isAuth ? null : '26px')};
    border-radius: 8px;
    padding: ${({ typeReply }: StyleProps) => (typeReply ? '14px' : null)};
    border-left: ${(props: StyleProps) =>
        props.typeReply ? `2px solid ${props.theme.gray300}` : null};
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;

    h5 {
        display: flex;
        align-items: center;
        font-size: 15px;
        font-weight: 500;
        color: ${(props) => props.theme.gray800};
    }
    p {
        margin-top: 7px;
        font-weight: 500;
        color: ${(props) => props.theme.gray500};
    }
`;

const ReplyTo = styled.p`
    font-weight: 500;
    margin-top: 5px;
    font-size: 14px;
    color: ${(props) => props.theme.gray400};
`;

const UserInfoDate = styled.div`
    display: flex;
    align-items: center;
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

type AppProps = {
    isAuth: boolean;
    postId: number;
    replyId?: number;
    author?: string;
    parentAuthor?: string | null;
    typeReply?: boolean;
    commentData: CommentType;
};

export function Reply({
    isAuth,
    postId,
    replyId,
    parentAuthor,
    typeReply,
    commentData,
}: AppProps): JSX.Element {
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

    const userAvatar = commentData.author.profileImg ?? defaultAvatar;

    return (
        <ReplyContent isAuth={isAuth} typeReply={typeReply}>
            <UserInfoDate>
                <h5>
                    <ProfileAvatar src={userAvatar} alt='Avatar' />
                    {commentData.author.universityName} | {commentData.author.username}
                </h5>
                <span style={{ margin: '0px 4px' }}>•</span>
                <span>{date}</span>
            </UserInfoDate>
            {typeReply && <ReplyTo>To: {parentAuthor}</ReplyTo>}
            <p>{commentData.content}</p>
            {isAuth ? (
                <>
                    {isReply ? (
                        <CreateComment
                            isReply={isReply}
                            postId={postId}
                            replyId={replyId}
                            closeReply={(cancel: boolean) => setReply(cancel)}
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
