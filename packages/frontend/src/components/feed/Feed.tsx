import React from 'react';
import styled from 'styled-components';

import { MainFeed } from './main-feed/MainFeed';
import { NewsFeed } from './fixed-feed/NewsFeed';

const FeedContainer = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-gap: 15px;
`;

export function Feed(): JSX.Element {
    return (
        <FeedContainer>
            <MainFeed />
            <NewsFeed />
        </FeedContainer>
    );
}
