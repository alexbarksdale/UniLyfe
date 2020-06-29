import React from 'react';
import styled from 'styled-components';

import { Container } from '../shared-styles/global.styles';
import { OurPicks } from '../our-picks/OurPicks';
import { Feed } from '../feed/Feed';

const Divider = styled.hr`
    border: none;
    height: 1.5px;
    margin: 19px 0px;
    background-color: ${(props) => props.theme.gray300};
`;

export function Home(): JSX.Element {
    return (
        <Container>
            <OurPicks />
            <Divider />
            <Feed />
        </Container>
    );
}
