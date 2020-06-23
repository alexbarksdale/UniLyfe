import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';

import { Container } from '../../utils/globalStyles.util';
import { device } from '../../utils/theme.util';
import { SearchBar } from '../search-bar/SearchBar';
import { UserDropdown } from './dropdown/UserDropdown';
import { ForumNavigation } from './ForumNavigation';

type StyleProps = {
    fontSize?: number;
    dropdown?: boolean | number;
};

const NavContainer = styled.div`
    position: fixed;
    width: 100%;

    z-index: 900;
    display: flex;
    align-items: center;
    height: 54px;
    box-shadow: 0px 0px 13px 0px rgba(0, 0, 0, 0.18);
    background-color: ${(props) => props.theme.white};

    @media ${device.mobileL} {
        height: unset;
    }
`;

const Navbar = styled.div`
    display: flex;

    @media ${device.mobileL} {
        flex-direction: column;
    }
`;

const LargeDisplay = styled.div`
    display: flex;
    width: 100%;

    @media ${device.mobileL} {
        display: ${(props: StyleProps) => (props.dropdown ? 'flex' : 'none')};
        flex-direction: column;
        padding-bottom: 15px;
    }
`;

const TitleContainer = styled.div`
    display: flex;
    @media ${device.mobileL} {
        margin: 15px 0px;
    }
`;

const ResonsiveDropdown = styled.button`
    display: none;
    cursor: pointer;
    font-size: 24px;
    color: ${(props) => props.theme.gray800};
    outline: none;
    background-color: transparent;

    &:hover {
        opacity: 0.8;
    }

    @media ${device.mobileL} {
        display: flex;
    }
`;

const NavTitle = styled.h1`
    display: flex;
    align-items: center;
    font-size: 20px;
    flex: 1;
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

    @media ${device.mobileL} {
        margin: unset;
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

    @media ${device.mobileL} {
        flex-direction: column;
    }
`;

export function Navigation(): JSX.Element {
    const node = useRef<HTMLDivElement>(null);
    const [dropdown, setDropdown] = useState(false);

    const handleClick = (e: any) => {
        if (node.current!.contains(e.target)) return;
        setDropdown(false);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    return (
        <>
            <NavContainer ref={node}>
                <Container>
                    <Navbar>
                        <TitleContainer>
                            <NavTitle>
                                <StyledLink to='/' fontSize={28}>
                                    UniLyfe
                                </StyledLink>
                            </NavTitle>
                            <ResonsiveDropdown onClick={() => setDropdown(!dropdown)}>
                                {dropdown ? <FaTimes /> : <FaBars />}
                            </ResonsiveDropdown>
                        </TitleContainer>
                        <LargeDisplay dropdown={dropdown ? 1 : 0}>
                            <NavLeft>
                                <li>
                                    <StyledLink to='/'>Home</StyledLink>
                                </li>
                                <li>
                                    <StyledLink to='/popular'>Popular</StyledLink>
                                </li>
                            </NavLeft>
                            <NavRight>
                                <SearchBar corpus={['test']} />
                                <UserDropdown />
                            </NavRight>
                        </LargeDisplay>
                    </Navbar>
                </Container>
            </NavContainer>
            <ForumNavigation />
        </>
    );
}
