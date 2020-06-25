import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Register } from './Register';

const AuthContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const AuthContent = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;

    padding: 26px 19px;
    width: 370px;
    margin: 65px 20px 65px 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 65px 0px rgba(0, 0, 0, 0.23);
    animation: blink 3s linear infinite;
    background-color: ${(props) => props.theme.white};

    @keyframes blink {
        0% {
            box-shadow: 0px 0px 65px 0px rgba(0, 0, 0, 0.23);
        }
        50% {
            box-shadow: 0px 0px 65px 0px rgba(0, 0, 0, 0.08);
        }
        100% {
            box-shadow: 0px 0px 65px 0px rgba(0, 0, 0, 0.23);
        }
    }

    @-webkit-keyframes blink {
        0% {
            box-shadow: 0px 0px 65px 0px rgba(0, 0, 0, 0.23);
        }
        50% {
            box-shadow: 0px 0px 65px 0px rgba(0, 0, 0, 0.08);
        }
        100% {
            box-shadow: 0px 0px 65px 0px rgba(0, 0, 0, 0.23);
        }
    }
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

export function Authentication(): JSX.Element {
    return (
        <AuthContainer>
            <AuthContent>
                <AuthHeader>
                    <h2>Create an account</h2>
                    <p>Join a community of anonymous verified students.</p>
                </AuthHeader>

                <Register />

                <ExistingAccount>
                    Already have an account?
                    <Link to='/signup'>Log In</Link>
                </ExistingAccount>
            </AuthContent>
        </AuthContainer>
    );
}
