import React, { useState, useEffect, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import slugify from 'slugify';

import { CategoryTitle } from '../../shared-styles/global.styles';
import { useRecentCommentSubSubscription } from '../../../generated/graphql';

const CardContainer = styled.div``;

const CommentList = styled.ul`
    li {
        list-style: none;

        a {
            text-decoration: none;
        }
        border-radius: 8px;
        transition: all 0.3s ease 0s;
        &:hover {
            padding: 8px;
            margin-bottom: 14px;
            background-color: #f8f8f8;
        }
    }
`;

const ReplyContent = styled.div`
    display: flex;
    flex-direction: column;
    border-radius: 8px;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;

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

const Divider = styled.hr`
    height: 2px;
    border: none;
    margin: 14px 0px;
    background-color: ${(props) => props.theme.gray200};
`;

type CommentType = {
    comment: {
        id: number;
        content: string;
        author: {
            id: number;
            username: string;
        };
        createdAt: Date;
    };

    post: {
        id: number;
        title: string;
        category: {
            id: number;
            name: string;
        };
    };
};

export function RecentComment(): JSX.Element {
    const [comments, setComments] = useState<CommentType[]>([]);
    const { data } = useRecentCommentSubSubscription();

    useEffect(() => {
        if (data) {
            setComments([data.recentCommentSub, ...comments]);
        }
    }, [data]);

    const renderComments = (comments: CommentType[]) => {
        const commentItems: ReactElement<CommentType>[] = [];
        // Only render 5 recent comments
        for (let i = 0; i < 5; i += 1) {
            if (comments[i]) {
                const {
                    comment: {
                        id: commentId,
                        author: { username },
                        createdAt,
                        content,
                    },
                } = comments[i];

                const rawDate = new Date(createdAt);
                const options = {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: 'numeric',
                };
                const date = `${rawDate.toLocaleDateString('en-us', options)}`;

                const {
                    post: {
                        id: postId,
                        category: { name },
                        title,
                    },
                } = comments[i];

                const slugTitle = slugify(title, '_').toLowerCase();
                const postUrl = `/category/${name}/${postId}/${slugTitle}`;

                commentItems.push(
                    <React.Fragment key={commentId}>
                        <li>
                            <Link to={postUrl} key={commentId}>
                                <ReplyContent>
                                    <UserInfoDate>
                                        <h5>TTU | {username}</h5>
                                        <span style={{ margin: '0px 4px' }}>•</span>
                                        <span>{date}</span>
                                    </UserInfoDate>
                                    <p>{content}</p>
                                </ReplyContent>
                            </Link>
                        </li>
                        <Divider />
                    </React.Fragment>
                );
            }
        }
        return commentItems;
    };

    return (
        <CardContainer>
            <CategoryTitle>Recent Chatter</CategoryTitle>
            <CommentList>{renderComments(comments)}</CommentList>
        </CardContainer>
    );
}
