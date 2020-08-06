import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaChevronDown, FaCog, FaSignOutAlt } from 'react-icons/fa';

import { useLogoutMutation, useMeQuery } from '../../../generated/graphql';
import { device } from '../../../utils/theme.util';
import { setToken } from '../../../utils/accessToken.util';
import defaultAvatar from '../../../assets/images/default-avatar.png';
import { setAuth } from '../../../store/actions/auth.action';

type StyleProps = {
    dropdown?: number;
    disable?: string;
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
    background-color: ${(props) => props.theme.gray300};
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
    box-shadow: 0px 0px 17px 0px rgba(0, 0, 0, 0.12);

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
    margin: 5px 0px;
    border-bottom: 2px solid ${(props) => props.theme.divider};
`;

const StyledLink = styled(Link)`
    display: flex;
    color: ${(props) => props.theme.gray600};
    font-size: 15px;
    font-weight: 600;
    letter-spacing: 0.5px;
    padding: 11px 0px;
    text-decoration: none;
    border-radius: 8px;
    transition: all 0.3s ease 0s;
    pointer-events: ${({ disable }: StyleProps) => (disable ? 'none' : null)};

    li {
        display: flex;
        align-items: center;

        p {
            font-size: 12px;
            color: ${(props) => props.theme.gray450};
        }
    }

    &:hover {
        color: ${(props) => props.theme.gray800};
        background-color: ${(props) => props.theme.gray200};
    }
`;

type AppProps = {
    username: string;
};

export function UserDropdown({ username }: AppProps): JSX.Element | null {
    const node = useRef<HTMLDivElement>(null);
    const [dropdown, setDropdown] = useState(false);
    const dispatch = useDispatch();

    const { data, loading } = useMeQuery();
    const [logout, { client }] = useLogoutMutation();

    const handleClick = (e: any) => {
        if (node.current!.contains(e.target)) return;
        setDropdown(false);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    if (loading || !data || !data.me || typeof data.me === 'undefined') return null;

    const userAvatar = data.me.profileImg ?? defaultAvatar;

    return (
        <Dropdown ref={node}>
            <UserProfileBtn onClick={() => setDropdown(!dropdown)}>
                <UserImg src={userAvatar} />
                <span>
                    <StyledIcon dropdown={dropdown ? 1 : 0} />
                </span>
            </UserProfileBtn>
            {dropdown ? (
                <ProfileList onClick={() => setDropdown(!dropdown)}>
                    <StyledLink to='/' disable='true'>
                        <li>
                            <UserImg
                                src={userAvatar}
                                alt='Avatar'
                                style={{ marginRight: '8px' }}
                            />
                            <div>
                                <p>Hello,</p>
                                {username}
                            </div>
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
                    <StyledLink
                        to='/login'
                        onClick={async () => {
                            await logout();
                            setToken('');
                            await client!.resetStore();
                            dispatch(setAuth(false));
                        }}
                    >
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
