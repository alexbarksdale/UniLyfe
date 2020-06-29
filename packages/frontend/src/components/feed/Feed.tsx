import React from 'react';

import { MainFeed } from './MainFeed';
import { FixedFeed } from './fixed-feed/FixedFeed';
import { TwoOneGrid } from '../shared-styles/global.styles';

export function Feed(): JSX.Element {
    return (
        <TwoOneGrid>
            <MainFeed />
            <FixedFeed />
        </TwoOneGrid>
    );
}
