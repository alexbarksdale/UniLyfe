import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

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
    margin: 20px;
    border-radius: 8px;
    box-shadow: 0px 0px 56px 0px rgba(0, 0, 0, 0.18);
    background-color: ${(props) => props.theme.white};
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

const AuthForm = styled.form`
    display: flex;
    flex-direction: column;

    label {
        display: flex;
        flex-direction: column;
        width: 100%;
        font-size: 14px;
        font-weight: 600;
        letter-spacing: 0.3px;
        color: ${(props) => props.theme.gray800};
    }

    button {
        font-size: 16px;
        font-weight: 600;
        border-radius: 8px;
        padding: 15px 19px;
        margin-top: 20px;
        outline: none;
        letter-spacing: 0.3px;
        color: ${(props) => props.theme.gray500};
        box-shadow: 0px 3px 0px 0px ${(props) => props.theme.gray350};
        background-color: ${(props) => props.theme.gray300};

        &:hover,
        &:focus {
            color: ${(props) => props.theme.gray800};
            box-shadow: 0px 3px 0px 0px ${(props) => props.theme.primary};
        }
    }

    p {
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
    }
`;

const AuthInput = styled.input`
    padding: 10px 13px;
    flex-grow: 1;
    font-weight: 500;
    font-size: 15px;
    outline: none;
    margin: 7px 0px 15px;
    border: 1.6px solid transparent;
    border-radius: 8px;
    color: ${(props) => props.theme.gray800};
    background-color: ${(props) => props.theme.gray300};

    &:focus {
        border: 1.6px solid ${(props) => props.theme.primary};
    }

    &::placeholder {
        color: ${(props) => props.theme.gray450};
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

                <AuthForm>
                    <label htmlFor='email'>
                        Enter your university email
                        <AuthInput
                            id='email'
                            type='email'
                            placeholder='Enter your email'
                        />
                    </label>
                    <label htmlFor='password'>
                        Enter your password
                        <AuthInput
                            id='password'
                            type='password'
                            placeholder='Enter your password'
                        />
                    </label>
                    <label htmlFor='confirm-password'>
                        Confirm your password
                        <AuthInput
                            id='confirm-password'
                            type='password'
                            placeholder='Confirm your password'
                        />
                    </label>
                    <button type='submit'>Sign Up</button>
                    <p>
                        Already have an account?
                        <Link to='/signup'>Log In</Link>
                    </p>
                </AuthForm>
            </AuthContent>
        </AuthContainer>
    );
}
