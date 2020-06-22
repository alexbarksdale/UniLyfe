import React from 'react';
import styled from 'styled-components';

import { NewsFeed } from './NewsFeed';

const FixedContainer = styled.div`
    width: 328px;
`;
export function FixedFeed(): JSX.Element {
    return (
        <FixedContainer>
            <NewsFeed />
        </FixedContainer>
    );
}
