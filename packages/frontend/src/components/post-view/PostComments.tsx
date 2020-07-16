import React from 'react';
import styled from 'styled-components';

import { useGetPostCommentsQuery } from '../../generated/graphql';
import { Reply } from './comments/Reply';

const CommentsContainer = styled.div`
    margin-top: 15px;
    margin-bottom: 30px;

    h3 {
        font-size: 17px;
        font-weight: 600;
        color: ${(props) => props.theme.gray800};
    }

    ul {
        margin-top: 15px;

        li {
            list-style: none;

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
        }
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
        universityName: string;
    };
    createdAt: Date;
};

type AppProps = {
    postId: number;
    isAuth: boolean;
};

export function PostComments({ isAuth, postId }: AppProps): JSX.Element | null {
    const { data, loading } = useGetPostCommentsQuery({
        variables: {
            postId: postId,
        },
    });

    if (!data || loading || typeof data.getPostComments === 'undefined') return null;

    const renderComments = (data: CommentType[]) => {
        return data.map((item: CommentType) => {
            // This comment is not a reply to another comment
            if (!item.replyId) {
                return (
                    <Reply
                        isAuth={isAuth}
                        postId={postId}
                        replyId={item.author.id}
                        commentData={item}
                        key={item.id}
                    />
                );
            }
            return (
                <Reply
                    isAuth={isAuth}
                    postId={postId}
                    replyId={item.author.id}
                    typeReply
                    commentData={item}
                    key={item.id}
                />
            );
        });
    };

    const commentLen = data.getPostComments.length;
    const pluralComment = commentLen !== 1 ? 'Comments' : 'Comment';
    return (
        <CommentsContainer>
            <h3>
                {commentLen} {pluralComment}
            </h3>
            <ul>
                <li>{renderComments(data.getPostComments)}</li>
            </ul>
        </CommentsContainer>
    );
}
