import React from 'react';
import styled from 'styled-components';

import { NewsFeed } from './NewsFeed';

const FixedContainer = styled.div``;
export function FixedFeed(): JSX.Element {
    return (
        <FixedContainer>
            <NewsFeed />
        </FixedContainer>
    );
}
