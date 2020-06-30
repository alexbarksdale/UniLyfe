import React from 'react';
import styled from 'styled-components';

import { CreatePostBtn } from './CreatePostBtn';
import { NewsFeed } from './NewsFeed';

const FixedContainer = styled.div``;
export function FixedFeed(): JSX.Element {
    return (
        <FixedContainer>
            <CreatePostBtn />
            <NewsFeed />
        </FixedContainer>
    );
}
