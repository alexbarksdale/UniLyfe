import React from 'react';
import styled from 'styled-components';

import { CreatePost } from './CreatePost';
import { NewsFeed } from './NewsFeed';

const FixedContainer = styled.div``;
export function FixedFeed(): JSX.Element {
    return (
        <FixedContainer>
            <CreatePost />
            <NewsFeed />
        </FixedContainer>
    );
}
