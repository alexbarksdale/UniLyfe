import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaCommentAlt, FaRegThumbsUp, FaRegCommentAlt, FaRegEye } from 'react-icons/fa';
import slugify from 'slugify';

import {
    PostHeader,
    PostContent,
    CategoryLink,
    PostInfoBar,
    PostStats,
    PostDate,
    UserLink,
} from '../../shared-styles/post.styles';
import { CategoryTitle } from '../../shared-styles/global.styles';
import { AppProps, FeedDataType } from '../types/types';
import { StoreState } from '../../../store/reducers/main.reducer';
import { usePostStatsSubSubscription } from '../../../generated/graphql';

const FeedContainer = styled.div`
    flex-direction: column;
`;
const FeedContent = styled.div`
    display: flex;
    margin-bottom: 9px;
`;

type SubData = {
    postId: number;
    subLikes: number;
    subViews: number;
};

export function MainFeed({ feedData }: AppProps): JSX.Element | null {
    const forum = useSelector(
        (state: StoreState) => state.navigationReducer.category.forum
    );

    const { data: postSub } = usePostStatsSubSubscription();

    // Post subscription data
    const subData: SubData = {
        postId: 0,
        subLikes: 0,
        subViews: 0,
    };

    if (postSub) {
        subData.postId = postSub.postStatsSub.id;
        subData.subLikes = postSub.postStatsSub.likes;
        subData.subViews = postSub.postStatsSub.views;
    }

    if (typeof feedData === 'undefined') return null;

    const renderFeed = (data: FeedDataType[]): JSX.Element[] => {
        return data.map((item: FeedDataType) => {
            // DATE
            const rawDate = new Date(item.createdAt);
            const options = {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            };
            const date = `${rawDate.toLocaleDateString('en-us', options)}`;

            // URL
            const slugTitle = slugify(item.title, '_').toLowerCase();
            const postUrl = `/category/${item.category.name}/${item.id}/${slugTitle}`;

            // STATS
            let postLikes = item.likes;
            let postViews = item.views;

            const { postId, subLikes, subViews } = subData;

            // Check if the subscription data belongs to this post
            if (postId === item.id) {
                postLikes = subLikes;
                postViews = subViews;
            }

            return (
                <FeedContent key={item.id}>
                    <Link to={postUrl}>
                        {item.thumbnail ? (
                            <PostHeader responsive bgUrl={item.thumbnail} />
                        ) : (
                            <PostHeader responsive>
                                <FaCommentAlt />
                            </PostHeader>
                        )}
                    </Link>
                    <PostContent>
                        <CategoryLink to='/'>{item.category.name}</CategoryLink>
                        <Link to={postUrl}>
                            <h1>{item.title}</h1>
                            <p>{item.content}</p>
                        </Link>
                        <PostInfoBar>
                            <UserLink to='/'>
                                {item.author.universityName} | {item.author.username}
                            </UserLink>
                            <span>•</span>
                            <PostStats>
                                <li>
                                    <Link to={postUrl}>
                                        <FaRegThumbsUp />
                                        {postLikes}
                                    </Link>
                                </li>
                                <li>
                                    <Link to={postUrl}>
                                        <FaRegCommentAlt />
                                        100
                                    </Link>
                                </li>
                                <li>
                                    <Link to={postUrl}>
                                        <FaRegEye />
                                        {postViews}
                                    </Link>
                                </li>
                            </PostStats>
                            <PostDate>{date}</PostDate>
                        </PostInfoBar>
                    </PostContent>
                </FeedContent>
            );
        });
    };

    return (
        <FeedContainer>
            <CategoryTitle>{forum ?? 'Uni Feed'}</CategoryTitle>
            {renderFeed(feedData)}
        </FeedContainer>
    );
}
