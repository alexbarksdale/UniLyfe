import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaChevronDown } from 'react-icons/fa';

import { Container } from '../../utils/globalStyles.util';
import { SearchBar } from '../searchbar/SearchBar';

type StyleProps = {
    fontSize?: number;
};

const NavbarContainer = styled.div`
    display: flex;
    align-items: center;
    height: 54px;
    box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.18);
`;

const Navbar = styled.div`
    display: flex;
`;

const NavTitle = styled.h1`
    display: flex;
    align-items: center;
    font-size: 20px;
    color: ${(props) => props.theme.gray800};
`;

const NavLeft = styled.ul`
    flex: 1;
    display: flex;
    align-items: center;
    padding-left: 45px;
    list-style: none;

    li {
        padding-right: 15px;
    }
`;

const StyledLink = styled(Link)`
    font-size: ${(props: StyleProps) => props.fontSize ?? '15px'};
    font-weight: 600;
    color: ${(props) => props.theme.gray600};
    text-decoration: none;

    &:hover {
        opacity: 0.8;
    }
`;

const NavRight = styled.div`
    display: flex;
`;

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

export function Navigation(): JSX.Element {
    return (
        <NavbarContainer>
            <Container>
                <Navbar>
                    <NavTitle>
                        <StyledLink to='/' fontSize={28}>
                            UniLyfe
                        </StyledLink>
                    </NavTitle>
                    <NavLeft>
                        <li>
                            <StyledLink to='/home'>Home</StyledLink>
                        </li>
                        <li>
                            <StyledLink to='/popular'>Popular</StyledLink>
                        </li>
                    </NavLeft>
                    <SearchBar corpus={['test']} />
                    <NavRight>
                        <Dropdown>
                            <UserImg src='https://avatars3.githubusercontent.com/u/30381624?s=400&u=20ad9862d76407105a4bf2569dc41659c4de3706&v=4' />
                            <span>
                                <FaChevronDown />
                            </span>
                        </Dropdown>
                    </NavRight>
                </Navbar>
            </Container>
        </NavbarContainer>
    );
}
