import React, { ReactElement } from 'react';
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
import { useOurPicksQuery } from '../../generated/graphql';
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

type PickResults = {
    id: number;
    title: string;
    content: string;
    thumbnail?: string | null | undefined;
    createdAt: Date;
    author: {
        id: number;
        username: string;
    };
    category: {
        id: number;
        name: string;
    };
};

// NOTE: This will probably be refactored in the future.
export function OurPicks(): JSX.Element | null {
    const { data, loading } = useOurPicksQuery();

    if (typeof data === 'undefined' || loading) return null;

    // Due to the way the grid is setup we need to render items this way.
    // I will probably come back to this component and change the UI which will allow a cleaner look
    // when rendering these items. Currently each component belongs to a grid-area, so that's why
    // it's checking which iteration we're on and pushing a certain styled component
    // to correspond to the correct grid layout.
    const renderPick = (data: PickResults[]): JSX.Element[] => {
        const items: Array<ReactElement> = [];

        for (let i = 0; i < data.length; i += 1) {
            const {
                id,
                title,
                category: { name },
                author: { username },
                content,
                thumbnail,
                createdAt,
            } = data[i];

            const rawDate = new Date(createdAt);
            const options = {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            };
            const date = `${rawDate.toLocaleDateString('en-us', options)}`;

            if (i === 0) {
                items.push(
                    <MainItem key={id}>
                        <Link to='/'>
                            {thumbnail ? (
                                <PostHeader big='true' bgUrl={thumbnail} />
                            ) : (
                                <PostHeader big='true'>
                                    <FaCommentAlt />
                                </PostHeader>
                            )}
                        </Link>
                        <PostContent>
                            <CategoryLink to='/'>{name}</CategoryLink>
                            <Link to='/'>
                                <h1>{title}</h1>
                                <p>{content}</p>
                            </Link>
                            <PostInfoBar>
                                <UserLink to='/' big='true'>
                                    XXX | {username}
                                </UserLink>
                                <PostDate>{date}</PostDate>
                            </PostInfoBar>
                        </PostContent>
                    </MainItem>
                );
            } else if (i === 1) {
                items.push(
                    <SecondItem key={id}>
                        <Link to='/'>
                            {thumbnail ? (
                                <PostHeader bgUrl={thumbnail} />
                            ) : (
                                <PostHeader>
                                    <FaCommentAlt />
                                </PostHeader>
                            )}
                        </Link>
                        <PostContent>
                            <CategoryLink to='/'>{name}</CategoryLink>
                            <Link to='/'>
                                <h1>{title}</h1>
                                <p>{content}</p>
                            </Link>
                            <PostInfoBar>
                                <UserLink to='/' big='true'>
                                    XXX | {username}
                                </UserLink>
                                <PostDate>{date}</PostDate>
                            </PostInfoBar>
                        </PostContent>
                    </SecondItem>
                );
            } else {
                items.push(
                    <ThirdItem key={id}>
                        <Link to='/'>
                            {thumbnail ? (
                                <PostHeader bgUrl={thumbnail} />
                            ) : (
                                <PostHeader>
                                    <FaCommentAlt />
                                </PostHeader>
                            )}
                        </Link>
                        <PostContent>
                            <CategoryLink to='/'>{name}</CategoryLink>
                            <Link to='/'>
                                <h1>{title}</h1>
                                <p>{content}</p>
                            </Link>
                            <PostInfoBar>
                                <UserLink to='/' big='true'>
                                    XXX | {username}
                                </UserLink>
                                <PostDate>{date}</PostDate>
                            </PostInfoBar>
                        </PostContent>
                    </ThirdItem>
                );
            }
        }
        return items;
    };

    return (
        <>
            <CategoryTitle>Our Picks</CategoryTitle>
            <PicksContainer>{renderPick(data.ourPicks)}</PicksContainer>
        </>
    );
}
