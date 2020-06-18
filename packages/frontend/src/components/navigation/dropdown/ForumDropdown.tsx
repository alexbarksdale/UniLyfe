import React from 'react';
import styled from 'styled-components';
import { FaChevronDown } from 'react-icons/fa';

const SelectBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 15px;
    color: ${(props) => props.theme.white};

    cursor: pointer;
    border: none;
    border-radius: 8px;
    min-width: 150px;
    padding: 6px 9px;
    background-color: #ffffff47;

    span {
        display: flex;
        margin-left: 15px;
    }
    &:hover {
        background-color: #ffffff38;
    }
`;

export function ForumDropdown(): JSX.Element {
    return (
        <SelectBtn>
            Productivity
            <span>
                <FaChevronDown />
            </span>
        </SelectBtn>
    );
}
