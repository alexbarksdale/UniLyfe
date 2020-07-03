import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaChevronDown, FaUserAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';

import { device } from '../../../utils/theme.util';

type StyleProps = {
    dropdown: number;
};

const Dropdown = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;

    span {
        font-size: 14px;
        display: flex;
        margin-left: 7px;
        color: ${(props) => props.theme.gray400};
    }

    @media ${device.tabletS} {
        align-items: baseline;
        flex-direction: column;
    }
`;

const UserImg = styled.img`
    height: 32px;
    width: 32px;
    border: 0;
    border-radius: 8px;
    background-color: red;
`;

const StyledIcon = styled(FaChevronDown)`
    transform: rotate(${(props: StyleProps) => (props.dropdown ? 180 : 0)}deg);
    transition: all 0.3s ease 0s;
`;

const UserProfileBtn = styled.button`
    display: flex;
    align-items: center;
    background-color: transparent;
    outline: none;
    color: ${(props) => props.theme.gray800};
    font-weight: 600;
    text-decoration: none;
    letter-spacing: 0.5px;
    &:hover {
        cursor: pointer;
        color: ${(props) => props.theme.primary};
        opacity: 0.8;
    }
`;

const ProfileList = styled.ul`
    z-index: 10;
    top: 45px;
    right: 0px;
    width: 175px;
    border-radius: 15px;
    position: absolute;
    padding: 6px;
    background-color: white;
    box-shadow: 0px 0px 17px 0px rgba(0, 0, 0, 0.2);

    li {
        display: flex;
        padding: 0px 16px;
        border-radius: 15px;

        svg {
            margin-right: 8px;
        }
    }

    @media ${device.tabletS} {
        margin-top: 10px;
        position: unset;
    }
`;

const ItemDivider = styled.div`
    margin: 2px 0px;
    border-bottom: 2px solid ${(props) => props.theme.divider};
`;

const StyledLink = styled(Link)`
    display: flex;
    color: ${(props) => props.theme.gray600};
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.5px;
    padding: 11px 0px;
    margin: 7px 0px;
    text-decoration: none;
    border-radius: 8px;
    transition: all 0.3s ease 0s;

    &:hover {
        color: ${(props) => props.theme.gray800};
        background-color: ${(props) => props.theme.gray200};
    }
`;

export function UserDropdown(): JSX.Element {
    const node = useRef<HTMLDivElement>(null);
    const [dropdown, setDropdown] = useState(true);

    const handleClick = (e: any) => {
        if (node.current!.contains(e.target)) return;
        setDropdown(false);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    return (
        <Dropdown ref={node}>
            <UserProfileBtn onClick={() => setDropdown(!dropdown)}>
                <UserImg src='https://avatars3.githubusercontent.com/u/30381624?s=400&u=20ad9862d76407105a4bf2569dc41659c4de3706&v=4' />
                <span>
                    <StyledIcon dropdown={dropdown ? 1 : 0} />
                </span>
            </UserProfileBtn>
            {dropdown ? (
                <ProfileList onClick={() => setDropdown(!dropdown)}>
                    <StyledLink to='/'>
                        <li>
                            <FaUserAlt />
                            Profile
                        </li>
                    </StyledLink>
                    <ItemDivider />
                    <StyledLink to='/settings'>
                        <li>
                            <FaCog />
                            Settings
                        </li>
                    </StyledLink>
                    <ItemDivider />
                    <StyledLink to='/login'>
                        <li>
                            <FaSignOutAlt />
                            Log Out
                        </li>
                    </StyledLink>
                </ProfileList>
            ) : null}
        </Dropdown>
    );
}
