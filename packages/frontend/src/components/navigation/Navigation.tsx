import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Container } from '../../utils/globalStyles.util';
import { SearchBar } from '../search-bar/SearchBar';
import { UserDropdown } from './dropdown/UserDropdown';
import { ForumNavigation } from './ForumNavigation';

type StyleProps = {
    fontSize?: number;
};

const NavContainer = styled.div`
    position: fixed;
    width: 100%;

    display: flex;
    align-items: center;
    height: 54px;
    box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.18);
    background-color: ${(props) => props.theme.white};
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
    margin-left: 45px;
    list-style: none;

    li {
        margin-right: 15px;
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

export function Navigation(): JSX.Element {
    return (
        <>
            <NavContainer>
                <Container>
                    <Navbar>
                        <NavTitle>
                            <StyledLink to='/' fontSize={28}>
                                UniLyfe
                            </StyledLink>
                        </NavTitle>
                        <NavLeft>
                            <li>
                                <StyledLink to='/'>Home</StyledLink>
                            </li>
                            <li>
                                <StyledLink to='/popular'>Popular</StyledLink>
                            </li>
                        </NavLeft>
                        <SearchBar corpus={['test']} />
                        <NavRight>
                            <UserDropdown />
                        </NavRight>
                    </Navbar>
                </Container>
            </NavContainer>
            <ForumNavigation />
        </>
    );
}
