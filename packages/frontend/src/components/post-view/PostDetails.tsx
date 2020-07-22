import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FaRegThumbsUp, FaRegEye } from 'react-icons/fa';

import { PostStats } from '../shared-styles/post.styles';
import {
    GetPostQuery,
    useUpdatePostStatsMutation,
    usePostStatsSubSubscription,
    useMeQuery,
} from '../../generated/graphql';

const PostDetailContainer = styled.div`
    div {
        h2 {
            font-weight: 600;
            color: ${(props) => props.theme.gray800};
        }

        p {
            font-size: 15px;
            font-weight: 500;
            margin: 9px 0px 15px 0px;
            color: ${(props) => props.theme.gray500};
        }
    }
`;

const PostImg = styled.img`
    height: 300px;
    width: 100%;
    object-fit: cover;
    margin-bottom: 12px;
`;

const PostDescription = styled.p`
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0.4px;
    color: ${(props) => props.theme.gray600};
    margin-bottom: 15px;
`;

const Divider = styled.hr`
    height: 2px;
    border: none;
    margin: 15px 0px;
    background-color: ${(props) => props.theme.divider};
`;

type AppProps = {
    postData: GetPostQuery;
};

export function PostDetails({ postData }: AppProps): JSX.Element | null {
    const { data: meData } = useMeQuery();
    const [updatePost] = useUpdatePostStatsMutation();
    const { data: postSub } = usePostStatsSubSubscription();

    const history = useHistory();

    const { getPost } = postData;

    let postViews = getPost.views;
    const postLikes = getPost.likes.length;

    // If we get our subscription, then we update the current views.
    if (postSub) {
        postViews = postSub.postStatsSub.views;
    }

    // Update view count when loaded.
    useEffect(() => {
        updatePost({
            variables: {
                postId: getPost.id,
                views: postViews + 1,
            },
        });
    }, []);

    const handleLike = () => {
        if (meData && meData.me) {
            updatePost({
                variables: {
                    postId: getPost.id,
                    userId: meData.me.id,
                },
            });
        } else {
            // Must be signed in to like a post.
            history.push('/login');
        }
    };

    return (
        <PostDetailContainer>
            {postData.getPost.thumbnail && <PostImg src={postData.getPost.thumbnail} />}
            <div>
                <h2>{getPost.title}</h2>
                <p>
                    Created by: {getPost.author.universityName} |{' '}
                    {getPost.author.username}
                </p>
            </div>
            <PostDescription>{getPost.content}</PostDescription>
            <PostStats postView>
                <li>
                    <button type='button' onClick={() => handleLike()}>
                        <FaRegThumbsUp />
                        {postLikes}
                    </button>
                </li>
                <li>
                    <span>
                        <FaRegEye />
                        {postViews}
                    </span>
                </li>
            </PostStats>
            <Divider />
        </PostDetailContainer>
    );
}
