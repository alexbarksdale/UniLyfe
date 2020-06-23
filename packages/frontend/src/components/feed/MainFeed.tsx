import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaCommentAlt, FaRegThumbsUp, FaRegCommentAlt, FaRegEye } from 'react-icons/fa';

import {
    PostHeader,
    PostContent,
    CategoryLink,
    PostInfoBar,
    UserLink,
} from '../../utils/postStyles.util';
import { CategoryTitle } from '../../utils/globalStyles.util';

const FeedContainer = styled.div`
    flex-direction: column;

    div {
        display: flex;
    }
`;

const PostStats = styled.ul`
    display: flex;
    flex: 1;

    li {
        display: flex;
        margin-right: 9px;

        a,
        button {
            display: flex;
            font-size: 14px;
            color: ${(props) => props.theme.gray600};
            transition: 0s;
            background-color: transparent;

            svg {
                font-size: 13px;
                margin-right: 4px;
            }

            &:hover {
                color: ${(props) => props.theme.gray450};
                transition: 0s;
            }
        }
    }
`;

export function MainFeed(): JSX.Element {
    return (
        <>
            <FeedContainer>
                <CategoryTitle>Uni Feed</CategoryTitle>
                <div>
                    <Link to='/'>
                        <PostHeader>
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
                            <p>June 20, 2020 0:00 AM</p>
                        </PostInfoBar>
                    </PostContent>
                </div>
            </FeedContainer>
        </>
    );
}
