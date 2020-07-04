import React from 'react';

import { MainFeed } from './feed/MainFeed';
import { FixedFeed } from './fixed-feed/FixedFeed';
import { TwoOneGrid } from '../shared-styles/global.styles';
import { AppProps } from './types/types';

export function Feed({ feedData }: AppProps): JSX.Element {
    return (
        <TwoOneGrid>
            <MainFeed feedData={feedData} />
            <FixedFeed />
        </TwoOneGrid>
    );
}
