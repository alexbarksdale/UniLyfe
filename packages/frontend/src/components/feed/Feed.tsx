import React from 'react';
import styled from 'styled-components';

import { MainFeed } from './MainFeed';
import { FixedFeed } from './fixed-feed/FixedFeed';

const FeedContainer = styled.div`
    display: grid;
    grid-gap: 15px;
    grid-template-columns: 2fr 1fr;
`;

export function Feed(): JSX.Element {
    return (
        <FeedContainer>
            <MainFeed />
            <FixedFeed />
        </FeedContainer>
    );
}
