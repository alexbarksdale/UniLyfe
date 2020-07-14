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

const FeedContainer = styled.div`
    flex-direction: column;
`;
const FeedContent = styled.div`
    display: flex;
    margin-bottom: 9px;
`;

export function MainFeed({ feedData }: AppProps): JSX.Element | null {
    const forum = useSelector(
        (state: StoreState) => state.navigationReducer.category.forum
    );

    if (typeof feedData === 'undefined') return null;

    const renderFeed = (data: FeedDataType[]): JSX.Element[] => {
        return data.map((item: FeedDataType) => {
            const rawDate = new Date(item.createdAt);
            const options = {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            };
            const date = `${rawDate.toLocaleDateString('en-us', options)}`;

            const slugTitle = slugify(item.title, '_').toLowerCase();
            const postUrl = `/category/${item.category.name}/${item.id}/${slugTitle}`;

            return (
                <FeedContent key={item.id}>
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
                            <UserLink to='/'>
                                {item.author.universityName} | {item.author.username}
                            </UserLink>
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
