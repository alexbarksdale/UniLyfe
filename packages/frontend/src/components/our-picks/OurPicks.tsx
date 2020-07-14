import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaCommentAlt } from 'react-icons/fa';

import {
    PostHeader,
    PostDate,
    PostContent,
    CategoryLink,
    PostInfoBar,
    UserLink,
} from '../shared-styles/post.styles';
import { CategoryTitle } from '../shared-styles/global.styles';

const PicksContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-areas: 'Main Main Second Second' 'Main Main Third Third' '. . . .';

    @media (max-width: 875px) {
        grid-template-areas: 'Main Main Main Main' 'Second Second Second Second' 'Third Third Third Third';
    }
`;

const MainItem = styled.div`
    height: 100%;
    grid-area: Main;
    margin-right: 16px;

    @media (max-width: 875px) {
        margin-right: 0px;
        margin-bottom: 16px;
    }
`;

const SecondItem = styled.div`
    display: flex;
    height: 124px;
    grid-area: Second;
    margin-bottom: 16px;
`;

const ThirdItem = styled.div`
    display: flex;
    height: 124px;
    grid-area: Third;
`;

export function OurPicks(): JSX.Element {
    return (
        <>
            <CategoryTitle>Our Picks</CategoryTitle>
            <PicksContainer>
                <MainItem>
                    <Link to='/'>
                        <PostHeader big='true'>
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
                            <UserLink to='/' big='true'>
                                XXX | User
                            </UserLink>
                            <PostDate>June 20, 2020</PostDate>
                        </PostInfoBar>
                    </PostContent>
                </MainItem>
                <SecondItem>
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
                            <UserLink to='/' big='true'>
                                XXX | User
                            </UserLink>
                            <PostDate>June 20, 2020</PostDate>
                        </PostInfoBar>
                    </PostContent>
                </SecondItem>
                <ThirdItem>
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
                            <UserLink to='/' big='true'>
                                XXX | User
                            </UserLink>
                            <PostDate>June 20, 2020</PostDate>
                        </PostInfoBar>
                    </PostContent>
                </ThirdItem>
            </PicksContainer>
        </>
    );
}
