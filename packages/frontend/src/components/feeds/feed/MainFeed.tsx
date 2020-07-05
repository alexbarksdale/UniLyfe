import React from 'react';
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
    UserLink,
} from '../../shared-styles/post.styles';
import { CategoryTitle } from '../../shared-styles/global.styles';
import { CreatePostBtn } from '../fixed-feed/CreatePostBtn';
import { AppProps } from '../types/types';
import { GetPostsQuery } from '../../../generated/graphql';

const FeedContainer = styled.div`
    flex-direction: column;
`;
const FeedContent = styled.div`
    display: flex;
    margin-bottom: 9px;
`;

const ResponsiveContent = styled.div`
    display: none !important;

    @media (max-width: 902px) {
        display: flex !important;
    }
`;

const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
];

export function MainFeed({ feedData }: AppProps): JSX.Element | null {
    if (typeof feedData === 'undefined') return null;

    const renderFeed = (feedData: GetPostsQuery): JSX.Element[] => {
        return feedData.getPosts.map((item) => {
            const rawDate = new Date(item.createdAt);
            const date = `${
                months[rawDate.getMonth()]
            } ${rawDate.getDay()}, ${rawDate.getFullYear()}`;

            const slugTitle = slugify(item.title, '_').toLowerCase();
            const postUrl = `/post/${item.id}/${slugTitle}`;

            return (
                <FeedContent key={item.title}>
                    <Link to={postUrl}>
                        <PostHeader responsive>
                            <FaCommentAlt />
                        </PostHeader>
                    </Link>
                    <PostContent>
                        <CategoryLink to='/'>{item.category.name}</CategoryLink>
                        <Link to={postUrl}>
                            <h1>{item.title}</h1>
                            <p>{item.content}</p>
                        </Link>
                        <PostInfoBar>
                            <UserLink to='/'>XXX | {item.author.username}</UserLink>
                            <span>•</span>
                            <PostStats>
                                <li>
                                    <button type='button'>
                                        <FaRegThumbsUp />
                                        {item.likes}
                                    </button>
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
                                        {item.views}
                                    </Link>
                                </li>
                            </PostStats>
                            <p>{date}</p>
                        </PostInfoBar>
                    </PostContent>
                </FeedContent>
            );
        });
    };

    return (
        <FeedContainer>
            <ResponsiveContent>
                <CreatePostBtn />
            </ResponsiveContent>
            <CategoryTitle>Uni Feed</CategoryTitle>
            {renderFeed(feedData)}
        </FeedContainer>
    );
}
