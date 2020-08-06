import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { FaThumbsUp, FaRegThumbsUp, FaRegEye } from 'react-icons/fa';

import { PostStats, ProfileAvatar } from '../shared-styles/post.styles';
import {
    GetPostQuery,
    useUpdatePostStatsMutation,
    usePostStatsSubSubscription,
    useMeQuery,
} from '../../generated/graphql';
import { Theme } from '../../utils/theme.util';
import defaultAvatar from '../../assets/images/default-avatar.png';

type StyleProps = {
    theme: Theme;
    liked: boolean;
};

const PostDetailContainer = styled.div`
    div {
        h2 {
            font-weight: 600;
            color: ${(props) => props.theme.gray800};
        }

        p {
            display: flex;
            align-items: center;

            font-size: 15px;
            font-weight: 500;
            margin: 9px 0px 15px 0px;
            color: ${(props) => props.theme.gray500};

            span {
                margin-right: 6px;
            }
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
    word-break: break-word;
`;

const PostControls = styled.div`
    display: flex;
`;

const EditBtn = styled.button`
    font-size: 15px;
    color: ${(props) => props.theme.gray400};
    background-color: transparent;
`;

const Divider = styled.hr`
    height: 2px;
    border: none;
    margin: 15px 0px;
    background-color: ${(props) => props.theme.divider};
`;

const LikeBtn = styled.button`
    color: ${({ theme, liked }: StyleProps) =>
        liked ? theme.primary : theme.gray600} !important;
`;

type AppProps = {
    postData: GetPostQuery;
};

export function PostDetails({ postData }: AppProps): JSX.Element | null {
    const history = useHistory();
    const [liked, setLiked] = useState(false);
    const [isAuthor, setAuthor] = useState(false);

    const { data: meData, loading } = useMeQuery();
    const [updatePost] = useUpdatePostStatsMutation();
    const { data: postSub } = usePostStatsSubSubscription();

    const { getPost } = postData;
    let postViews = getPost.views;
    const postLikes = getPost.likes!.length;

    // If we get our subscription, then we update the current views.
    if (postSub) {
        postViews = postSub.postStatsSub.views;
    }

    // Update view count and check if the post is liked when loaded.
    useEffect(() => {
        if (meData && meData.me) {
            // Check if this post belongs to the user logged in.
            if (meData.me.id === postData.getPost.author.id) setAuthor(true);

            for (const like of meData.me.likes) {
                if (like.id === getPost.id) {
                    setLiked(true);
                    break;
                }
            }
        }
        updatePost({
            variables: {
                postId: getPost.id,
                views: postViews + 1,
            },
        });
    }, [loading]);

    const handleLike = async () => {
        if (meData && meData.me) {
            const res = await updatePost({
                variables: {
                    postId: getPost.id,
                    userId: meData.me.id,
                },
            });
            if (res.data && res.data.updatePostStats.liked) {
                setLiked(true);
            } else {
                setLiked(false);
            }
        } else {
            // Must be signed in to like a post.
            history.push('/login');
        }
    };

    const userAvatar = getPost.author.profileImg ?? defaultAvatar;

    return (
        <PostDetailContainer>
            {getPost.thumbnail && <PostImg src={getPost.thumbnail} />}
            <div>
                <h2>{getPost.title}</h2>
                <p>
                    <span>Created by:</span>
                    <ProfileAvatar src={userAvatar} alt='Avatar' />
                    {getPost.author.universityName} | {getPost.author.username}
                </p>
            </div>
            <PostDescription>{getPost.content}</PostDescription>
            <PostControls>
                <PostStats postView>
                    <li>
                        <LikeBtn liked={liked} type='button' onClick={() => handleLike()}>
                            {liked ? <FaThumbsUp /> : <FaRegThumbsUp />}
                            {postLikes}
                        </LikeBtn>
                    </li>
                    <li>
                        <span>
                            <FaRegEye />
                            {postViews}
                        </span>
                    </li>
                </PostStats>
                {isAuthor && <EditBtn type='button'>Edit</EditBtn>}
            </PostControls>
            <Divider />
        </PostDetailContainer>
    );
}
