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
import { device } from '../../../utils/theme.util';

const FeedContainer = styled.div`
    flex-direction: column;
`;
const FeedContent = styled.div`
    display: flex;

    &::after {
        content: '';
        width: 50px;
    }
`;

const Divider = styled.hr`
    height: 0px;
    border: none;
    background-color: ${(props) => props.theme.gray200};
    margin: 8px 0px;

    @media ${device.mobileL} {
        height: 1px;
        margin: 16px 0px;
    }
`;

export function MainFeed({ feedData }: AppProps): JSX.Element | null {
    const { data: subData } = usePostStatsSubSubscription();

    const forum = useSelector(
        (state: StoreState) => state.navigationReducer.category.forum
    );

    if (typeof feedData === 'undefined') return null;

    const renderFeed = (data: FeedDataType[]): JSX.Element[] => {
        let postLikes: number;
        let postViews: number;

        return data.map((item: FeedDataType) => {
            // URL
            const slugTitle = slugify(item.title, '_').toLowerCase();
            const postUrl = `/category/${item.category.name}/${item.id}/${slugTitle}`;

            // DATE
            const rawDate = new Date(item.createdAt);
            const options = {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            };
            const date = `${rawDate.toLocaleDateString('en-us', options)}`;

            // STATS
            postLikes = item.likes!.length;
            postViews = item.views;

            // Check if we got a subscription
            if (subData) {
                const { id, likes, views } = subData.postStatsSub;
                // See if the subscription data belongs to this post
                if (id === item.id) {
                    postLikes = likes!.length;
                    postViews = views;
                }
            }

            return (
                <React.Fragment key={item.id}>
                    <FeedContent>
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
                                            <FaRegCommentAlt />0
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
                    <Divider />
                </React.Fragment>
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
