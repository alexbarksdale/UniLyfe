import React from 'react';
import styled from 'styled-components';

import { device } from '../../../utils/theme.util';
import { Container } from '../../shared-styles/global.styles';
import { OurPicks } from '../../our-picks/OurPicks';
import { Feed } from '../../feeds/Feed';
import { useGetPostsQuery } from '../../../generated/graphql';
import { GlobalNews } from './GlobalNews';

const LargeContainer = styled.div`
    height: 422px;
    width: 1205px;
    margin: auto;

    @media ${device.laptopM} {
        width: 100%;
    }

    @media ${device.tabletL} {
        height: 486px;
    }
`;

const Divider = styled.hr`
    border: none;
    height: 1.5px;
    margin: 19px 0px;
    background-color: ${(props) => props.theme.gray300};
`;

export function Home(): JSX.Element | null {
    const { data, loading } = useGetPostsQuery();
    if (loading || typeof data === 'undefined') return null;

    return (
        <>
            <LargeContainer>
                <GlobalNews />
            </LargeContainer>
            <Container>
                <OurPicks />
                <Divider />
                <Feed feedData={data.getPosts} />
            </Container>
        </>
    );
}
