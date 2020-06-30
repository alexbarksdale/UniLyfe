import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const CreateBtn = styled.button`
    padding: 13px;
    margin-bottom: 15px;
    font-size: 15px;
    font-weight: 500;
    border-radius: 8px;
    width: 100%;
    color: ${(props) => props.theme.white};
    letter-spacing: 0.7px;
    background-color: ${(props) => props.theme.primary};
    transition: all 0.3s ease 0s;

    &:hover {
        color: ${(props) => props.theme.white};
        background-color: ${(props) => props.theme.darkPrimary};
    }
`;

export function CreatePostBtn(): JSX.Element {
    return (
        <Link to='/create'>
            <CreateBtn>Create Post</CreateBtn>
        </Link>
    );
}
