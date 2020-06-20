import React from 'react';
import styled from 'styled-components';
import { FaFire, FaCertificate } from 'react-icons/fa';

import { ForumDropdown } from './dropdown/ForumDropdown';
import { Container } from '../../utils/globalStyles.util';

const NavContainer = styled.div`
    position: fixed;
    width: inherit;
    margin-top: 54px;

    display: flex;
    justify-content: center;
    height: 45px;
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    background-color: ${(props) => props.theme.primary};
`;

const NavList = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
`;

const FilterBtn = styled.button`
    display: flex;
    align-items: center;
    text-decoration: none;

    font-size: 15px;
    color: ${(props) => props.theme.white};

    cursor: pointer;
    padding: 6px 9px;
    border-radius: 8px;
    background-color: transparent;

    svg {
        font-size: 13px;
        opacity: 0.6;
        margin-right: 5px;
    }

    &:hover {
        background-color: #ffffff38;
    }
`;

// This component was inspired by: Hansa Sahu
export function ForumNavigation(): JSX.Element {
    return (
        <Container>
            <div style={{ paddingBottom: '114px', width: 'inherit' }}>
                <NavContainer>
                    <NavList>
                        <li>
                            <ForumDropdown />
                        </li>
                        <li>
                            <FilterBtn>
                                <span>
                                    <FaFire />
                                </span>
                                Hot
                            </FilterBtn>
                        </li>
                        <li>
                            <FilterBtn>
                                <span>
                                    <FaCertificate />
                                </span>
                                New
                            </FilterBtn>
                        </li>
                    </NavList>
                </NavContainer>
            </div>
        </Container>
    );
}
