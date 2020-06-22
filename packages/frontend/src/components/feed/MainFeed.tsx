import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaCommentAlt } from 'react-icons/fa';

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
                            <p>June 20, 2020 0:00 AM</p>
                        </PostInfoBar>
                    </PostContent>
                </div>
            </FeedContainer>
        </>
    );
}
