import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import slugify from 'slugify';

import { CategoryTitle } from '../../shared-styles/global.styles';
import {
    useRecentCommentsQuery,
    useRecentCommentsSubSubscription,
} from '../../../generated/graphql';
import { storeComments } from '../../../store/actions/comment.action';
import { StoreState } from '../../../store/reducers/main.reducer';
import { CommentState, CommentsRes } from '../../../store/types/comment.types';
import { limitText } from '../../../utils/general.util';
import defaultAvatar from '../../../assets/images/default-avatar.png';
import { ProfileAvatar } from '../../shared-styles/post.styles';

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
        color: ${(props) => props.theme.gray800};
    }
    span {
        font-weight: 500;
        font-size: 14px;
        color: ${(props) => props.theme.gray400};
    }
    p {
        margin-top: 7px;
        word-break: break-word;
        font-weight: 500;
        color: ${(props) => props.theme.gray500};
    }
`;

const UserInfoDate = styled.div`
    display: flex;
    align-items: center;
`;

const Divider = styled.hr`
    height: 2px;
    border: none;
    margin: 14px 0px;
    background-color: ${(props) => props.theme.gray200};
`;

export function RecentComment(): JSX.Element | null {
    const dispatch = useDispatch();
    const commentStore = useSelector((state: StoreState) => state.commentReducer);

    const { data: recentData, loading } = useRecentCommentsQuery();
    const { data: subData } = useRecentCommentsSubSubscription();

    // Fetches for initial recent comments.
    useEffect(() => {
        if (recentData && commentStore.fetch) {
            dispatch(storeComments({ ...recentData.recentComments, fetch: false }));
        }
    }, [loading]);

    // Updates recent comments from our subscription.
    useEffect(() => {
        if (subData) {
            dispatch(storeComments(subData.recentComments));
        }
    }, [subData]);

    const renderComments = (data: CommentState) => {
        return data.comments.map((comment: CommentsRes, i: number) => {
            const {
                id: commentId,
                content,
                author: { username, profileImg },
                createdAt,
            } = comment;

            const {
                id: postId,
                category: { name },
                title,
            } = data.posts[i];

            const rawDate = new Date(createdAt);
            const options = {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
            };
            const date = `${rawDate.toLocaleDateString('en-us', options)}`;

            const slugTitle = slugify(title, '_').toLowerCase();
            const postUrl = `/category/${name}/${postId}/${slugTitle}`;

            const userAvatar = profileImg ?? defaultAvatar;

            return (
                <React.Fragment key={commentId}>
                    <li>
                        <Link to={postUrl} key={commentId}>
                            <ReplyContent>
                                <UserInfoDate>
                                    <ProfileAvatar src={userAvatar} alt='Avatar' />
                                    <h5>TTU | {username}</h5>
                                    <span style={{ margin: '0px 4px' }}>•</span>
                                    <span>{date}</span>
                                </UserInfoDate>
                                <p>{limitText(content, 150)}</p>
                            </ReplyContent>
                        </Link>
                    </li>
                    <Divider />
                </React.Fragment>
            );
        });
    };

    return (
        <CardContainer>
            <CategoryTitle>Recent Chatter</CategoryTitle>
            <CommentList>{renderComments(commentStore)}</CommentList>
        </CardContainer>
    );
}
