import React from 'react';
import styled from 'styled-components';

const Sample = styled.h1`
    color: ${({ theme }) => theme.primary};
`;

export function Home(): JSX.Element {
    return <Sample>Hello World - /src/components/home/Home.tsx</Sample>;
}
