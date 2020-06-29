import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaCommentAlt, FaRegThumbsUp, FaRegCommentAlt, FaRegEye } from 'react-icons/fa';

import {
    PostHeader,
    PostContent,
    CategoryLink,
    PostInfoBar,
    PostStats,
    UserLink,
} from '../shared-styles/post.styles';
import { CategoryTitle } from '../shared-styles/global.styles';

const FeedContainer = styled.div`
    flex-direction: column;

    div {
        display: flex;
    }
`;

export function MainFeed(): JSX.Element {
    return (
        <>
            <FeedContainer>
                <CategoryTitle>Uni Feed</CategoryTitle>
                <div>
                    <Link to='/post'>
                        <PostHeader responsive>
                            <FaCommentAlt />
                        </PostHeader>
                    </Link>
                    <PostContent>
                        <CategoryLink to='/'>Category</CategoryLink>
                        <Link to='/'>
                            <h1>Filler title</h1>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna
                                aliqua.
                            </p>
                        </Link>
                        <PostInfoBar>
                            <UserLink to='/'>XXX | User</UserLink>
                            <span>•</span>
                            <PostStats>
                                <li>
                                    <button type='button'>
                                        <FaRegThumbsUp />
                                        100
                                    </button>
                                </li>
                                <li>
                                    <Link to='/'>
                                        <FaRegCommentAlt />
                                        100
                                    </Link>
                                </li>
                                <li>
                                    <Link to='/'>
                                        <FaRegEye />
                                        100
                                    </Link>
                                </li>
                            </PostStats>
                            <p>June 20, 2020</p>
                        </PostInfoBar>
                    </PostContent>
                </div>
            </FeedContainer>
        </>
    );
}
