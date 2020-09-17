import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes, FaPencilAlt } from 'react-icons/fa';

import { Container } from '../shared-styles/global.styles';
import { device } from '../../utils/theme.util';
import { UserDropdown } from './dropdown/UserDropdown';
import { ForumNavigation } from './ForumNavigation';
import { NavItems } from './NavItems';
import { useMeQuery } from '../../generated/graphql';
import { setBrowsing, setCategory } from '../../store/actions/navigation.action';
import { StoreState } from '../../store/reducers/main.reducer';
import { NavigationTypes } from '../../store/types/navigation.types';

type StyleProps = {
    fontSize?: number;
    browsing?: boolean;
    dropdown?: boolean | number;
};

const NavSpacing = styled.div`
    padding-bottom: 15px;
    @media ${device.mobileL} {
        padding-bottom: 70px;
    }
`;

const NavContainer = styled.div`
    position: fixed;
    width: 100%;
    z-index: 900;
    display: flex;
    align-items: center;
    height: 54px;
    box-shadow: ${({ browsing }: StyleProps) =>
        browsing
            ? '0px 1.5px 0px 0px rgba(0,0,0,0.06)'
            : '0px 0px 13px rgba(0,0,0,0.18)'};

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
    justify-content: flex-end;
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
    transition: all 0.3s ease 0s;
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
    display: none;
    align-items: center;
    margin-left: 45px;
    list-style: none;
    li {
        margin-right: 15px;
    }
    @media ${device.mobileL} {
        display: flex;
        margin: unset;
    }
`;

const StyledLink = styled(Link)`
    font-size: ${(props: StyleProps) => props.fontSize ?? '15px'};
    font-weight: 600;
    color: ${(props) => props.theme.gray600};
    text-decoration: none;
    transition: all 0.3s ease 0s;
    &:hover {
        opacity: 0.8;
    }
`;

const CreatePostBtn = styled(Link)`
    display: flex;
    padding: 9px;
    color: ${(props) => props.theme.gray500};
    margin-right: 8px;
    border-radius: 8px;
    transition: all 0.3s ease 0s;

    &:hover {
        background-color: ${(props) => props.theme.gray300};
    }
`;

const NavRight = styled.ul`
    display: flex;
    align-items: center;
    list-style: none;
    li {
        margin-left: 15px;

        @media ${device.mobileL} {
            margin-left: 0px;
            margin-right: 15px;
        }
    }
    @media ${device.mobileL} {
        align-items: unset;
    }
`;

export function Navigation(): JSX.Element | null {
    const dispatch = useDispatch();
    const browsing = useSelector((state: StoreState) => state.navigationReducer.browsing);

    const { data, loading } = useMeQuery();

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

    if (loading) return null;

    const setStateCategory = (category?: string): void => {
        dispatch(setBrowsing(true));
        dispatch(setCategory(category, NavigationTypes.SET_UNILYFE_CATEGORY));
    };

    return (
        <NavSpacing>
            <NavContainer ref={node} browsing={browsing}>
                <Container>
                    <Navbar>
                        <TitleContainer>
                            <NavTitle>
                                <StyledLink
                                    to='/'
                                    fontSize={28}
                                    onClick={() => setStateCategory()}
                                >
                                    UniLyfe
                                </StyledLink>
                            </NavTitle>
                            <ResonsiveDropdown onClick={() => setDropdown(!dropdown)}>
                                {dropdown ? <FaTimes /> : <FaBars />}
                            </ResonsiveDropdown>
                        </TitleContainer>
                        <LargeDisplay dropdown={dropdown ? 1 : 0}>
                            <NavLeft>
                                <NavItems />
                            </NavLeft>
                            {/* <SearchBar corpus={['test']} /> */}
                            <NavRight>
                                {data && data.me ? (
                                    <>
                                        <CreatePostBtn to='/create'>
                                            <FaPencilAlt />
                                        </CreatePostBtn>
                                        <UserDropdown username={data.me.username} />
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <StyledLink to='/login'>Log In</StyledLink>
                                        </li>
                                        <li>
                                            <StyledLink to='/signup'>Sign Up</StyledLink>
                                        </li>
                                    </>
                                )}
                            </NavRight>
                        </LargeDisplay>
                    </Navbar>
                </Container>
            </NavContainer>
            {browsing ? <ForumNavigation /> : null}
        </NavSpacing>
    );
}
