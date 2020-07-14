import React from 'react';
import styled from 'styled-components';

import { NavItems } from './NavItems';
import { useGetCategoriesQuery } from '../../generated/graphql';
import { device } from '../../utils/theme.util';

const ResponsiveContainer = styled.div`
    padding-bottom: 114px;
    width: inherit;

    @media ${device.mobileL} {
        padding-bottom: 114px;
        display: none;
    }
`;

const NavContainer = styled.div`
    position: fixed;
    width: 100%;
    margin-top: 54px;

    display: flex;
    justify-content: center;
    height: 45px;
    background-color: ${(props) => props.theme.white};
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.12);
`;

const NavList = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;

    li {
        margin-left: 20px;

        a {
            color: ${(props) => props.theme.gray450};
            font-weight: 500;
            font-size: 16px;
            background-color: transparent;
            text-decoration: none;

            &:hover {
                color: ${(props) => props.theme.gray600};
            }
        }
    }
`;

export function ForumNavigation(): JSX.Element | null {
    const { data, loading } = useGetCategoriesQuery();

    if (loading || !data) return null;

    return (
        <ResponsiveContainer>
            <NavContainer>
                <NavList>
                    <NavItems />
                </NavList>
            </NavContainer>
        </ResponsiveContainer>
    );
}
