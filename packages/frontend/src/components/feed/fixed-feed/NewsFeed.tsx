import React from 'react';
import styled from 'styled-components';

import { CategoryTitle } from '../../../utils/globalStyles.util';

const NewsContainer = styled.div`
    background-color: red;
`;

export function NewsFeed(): JSX.Element {
    return (
        <NewsContainer>
            <CategoryTitle>News</CategoryTitle>
        </NewsContainer>
    );
}
