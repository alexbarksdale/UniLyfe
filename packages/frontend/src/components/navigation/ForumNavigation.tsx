import React from 'react';
import styled from 'styled-components';
import { FaFire, FaCertificate } from 'react-icons/fa';

import { ForumDropdown } from './dropdown/ForumDropdown';
import { Container } from '../shared-styles/global.styles';
import { useGetCategoriesQuery } from '../../generated/graphql';

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
    font-weight: 500;
    color: ${(props) => props.theme.white};

    outline: none;
    cursor: pointer;
    padding: 6px 9px;
    border-radius: 8px;
    background-color: transparent;
    transition: all 0.3s ease 0s;

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
export function ForumNavigation(): JSX.Element | null {
    const { data, loading } = useGetCategoriesQuery();

    if (loading || !data) return null;

    return (
        <Container>
            <div style={{ paddingBottom: '114px', width: 'inherit' }}>
                <NavContainer>
                    <NavList>
                        <li>
                            <ForumDropdown categories={data} />
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
