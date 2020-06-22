import React from 'react';
import styled from 'styled-components';

import newsHeader from '../../../assets/images/news-header.png';

const NewsContainer = styled.div``;

const NewsHeader = styled.div`
    padding: 65px 8px 8px 16px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background: url(${newsHeader}) center;
    background-blend-mode: hard-light;
    background-color: #ffe7d3;

    h1 {
        font-size: 20px;
        font-weight: 600;
        color: ${(props) => props.theme.gray800};
    }
`;

const NewsContent = styled.div`
    height: 100px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    background-color: ${(props) => props.theme.gray200};
`;

export function NewsFeed(): JSX.Element {
    return (
        <NewsContainer>
            <NewsHeader />
            <NewsContent>Test</NewsContent>
        </NewsContainer>
    );
}
