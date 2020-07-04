import React from 'react';
import styled from 'styled-components';

import { CreatePostBtn } from './CreatePostBtn';
import { NewsFeed } from './NewsFeed';
import { useMeQuery } from '../../../generated/graphql';

const ResponsiveContent = styled.div`
    @media (max-width: 902px) {
        display: none !important;
    }
`;

export function FixedFeed(): JSX.Element {
    const { data } = useMeQuery();

    return (
        <div>
            <ResponsiveContent>
                {data && data.me ? <CreatePostBtn /> : null}
            </ResponsiveContent>
            <NewsFeed />
        </div>
    );
}
