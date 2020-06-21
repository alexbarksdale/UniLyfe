import React from 'react';
import styled from 'styled-components';

import { Container } from '../../utils/globalStyles.util';
import { OurPicks } from '../our-picks/OurPicks';
import { Feed } from '../feed/Feed';

const CategoryTitle = styled.h2`
    font-size: 20px;
    font-weight: 600;
    color: ${(props) => props.theme.gray800};
    margin-bottom: 10px;
`;

const Divider = styled.hr`
    border: none;
    height: 1.5px;
    margin: 19px 0px;
    background-color: ${(props) => props.theme.gray300};
`;

export function Home(): JSX.Element {
    return (
        <Container>
            <CategoryTitle>Our Picks</CategoryTitle>
            <OurPicks />
            <Divider />
            <CategoryTitle>Uni Feed</CategoryTitle>
            <Feed />
        </Container>
    );
}
