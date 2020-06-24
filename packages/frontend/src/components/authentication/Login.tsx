import React from 'react';
import styled from 'styled-components';

const LoginContainer = styled.div`
    background-color: red;
`;

export function Login(): JSX.Element {
    return (
        <LoginContainer>
            <h1>Hello</h1>
        </LoginContainer>
    );
}
