import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { History } from 'history';

import { Login } from './Login';
import { Register } from './Register';
import { CardContainer } from '../shared-styles/global.styles';

type AppProps = {
    typeLogin?: boolean;
    history: History;
};

const AuthContainer = styled.div`
    display: flex;
    justify-content: center;
    padding-top: 85px;
`;

const AuthContent = styled.div`
    width: 370px;
    ${CardContainer}
`;

const AuthHeader = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 25px;

    h2 {
        font-weight: 600;
        color: ${(props) => props.theme.gray800};
        margin-bottom: 8px;
    }

    p {
        text-align: center;
        letter-spacing: 0.2px;
        font-size: 15px;
        font-weight: 500;
        color: ${(props) => props.theme.gray500};
    }
`;

const ExistingAccount = styled.p`
    text-align: center;
    font-weight: 500;
    font-size: 15px;
    margin-top: 16px;

    a {
        text-decoration: none;
        color: ${(props) => props.theme.primary};
        margin-left: 6px;

        &:hover {
            opacity: 0.8;
            text-decoration: underline;
        }
    }
`;

export function Authentication({ typeLogin, history }: AppProps): JSX.Element {
    const heading = typeLogin ? 'Welcome back!' : 'Create an account';
    const subHeading = typeLogin
        ? 'Log in to create posts and interact with the community.'
        : 'Join a community of anonymous verified students.';
    const existingAccount = typeLogin
        ? "Don't have an account?"
        : 'Already have an account?';

    return (
        <AuthContainer>
            <AuthContent>
                <AuthHeader>
                    <h2>{heading}</h2>
                    <p>{subHeading}</p>
                </AuthHeader>

                {typeLogin ? <Login history={history} /> : <Register history={history} />}

                <ExistingAccount>
                    {existingAccount}
                    <Link to={typeLogin ? '/signup' : '/login'}>
                        {typeLogin ? 'Sign Up' : 'Log In'}
                    </Link>
                </ExistingAccount>
            </AuthContent>
        </AuthContainer>
    );
}
