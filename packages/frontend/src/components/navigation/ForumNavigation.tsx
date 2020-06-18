import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaFire, FaCertificate } from 'react-icons/fa';

import { ForumDropdown } from './dropdown/ForumDropdown';
import { Container } from '../../utils/globalStyles.util';

const NavContainer = styled.div`
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

    li {
        margin-right: 15px;
    }
`;

const StyledLink = styled(Link)`
    display: flex;
    align-items: center;
    text-decoration: none;
    font-size: 15px;
    color: ${(props) => props.theme.white};

    svg {
        opacity: 0.6;
        margin-right: 4px;
    }
`;

// This component was inspired by: Hansa Sahu
// NOTE: Probably going to switch to buttons for filter controls
export function ForumNavigation(): JSX.Element {
    return (
        <Container>
            <NavContainer>
                <NavList>
                    <li>
                        <ForumDropdown />
                    </li>
                    <li>
                        <StyledLink to='/'>
                            <span>
                                <FaFire />
                            </span>
                            Hot
                        </StyledLink>
                    </li>
                    <li>
                        <StyledLink to='/'>
                            <span>
                                <FaCertificate />
                            </span>
                            New
                        </StyledLink>
                    </li>
                </NavList>
            </NavContainer>
        </Container>
    );
}
