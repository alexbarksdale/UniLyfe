import React from 'react';
import styled from 'styled-components';

import { Container } from '../../utils/globalStyles.util';
import { OurPicks } from '../our-picks/OurPicks';

const CategoryTitle = styled.h2`
    font-size: 22px;
    color: ${(props) => props.theme.gray800};
    margin-bottom: 10px;
`;

const Divider = styled.hr`
    border: none;
    height: 2px;
    margin: 20px 0px;
    background-color: ${(props) => props.theme.gray300};
`;

export function Home(): JSX.Element {
    return (
        <Container>
            <CategoryTitle>Our Picks</CategoryTitle>
            <OurPicks />
            <Divider />
        </Container>
    );
}
