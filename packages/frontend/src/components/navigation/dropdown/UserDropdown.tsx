import React from 'react';
import styled from 'styled-components';
import { FaChevronDown } from 'react-icons/fa';

const Dropdown = styled.div`
    display: flex;
    align-items: center;
    cursor: pointer;

    span {
        font-size: 14px;
        display: flex;
        margin-left: 7px;
        color: ${(props) => props.theme.gray400};
    }
    &:hover {
        opacity: 0.8;
    }
`;

const UserImg = styled.img`
    height: 32px;
    width: 32px;
    border: 0;
    border-radius: 8px;
    background-color: red;
`;

// TODO: Dropdown functionality
export function UserDropdown(): JSX.Element {
    return (
        <Dropdown>
            <UserImg src='https://avatars3.githubusercontent.com/u/30381624?s=400&u=20ad9862d76407105a4bf2569dc41659c4de3706&v=4' />
            <span>
                <FaChevronDown />
            </span>
        </Dropdown>
    );
}
