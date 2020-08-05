import React from 'react';
import styled from 'styled-components';

import { device } from '../../../utils/theme.util';
import { Container } from '../../shared-styles/global.styles';
import { OurPicks } from '../../our-picks/OurPicks';
import { Feed } from '../../feeds/Feed';
import { useGetPostsQuery } from '../../../generated/graphql';
import { UniNews } from './UniNews';

const LargeContainer = styled.div`
    width: 1205px;
    margin: auto;
    margin-bottom: 15px;

    @media ${device.laptopM} {
        width: 100%;
    }
`;

const Divider = styled.hr`
    border: none;
    height: 2px;
    margin: 19px 0px;
    background-color: ${(props) => props.theme.gray200};
`;

export function Home(): JSX.Element | null {
    const { data, loading } = useGetPostsQuery();
    if (loading || typeof data === 'undefined') return null;

    return (
        <>
            <LargeContainer>
                <UniNews />
            </LargeContainer>
            <Container>
                <OurPicks />
                <Divider />
                <Feed feedData={data.getPosts} />
            </Container>
        </>
    );
}
