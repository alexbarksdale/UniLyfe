import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaChevronDown, FaRegStar } from 'react-icons/fa';

import { device } from '../../../utils/theme.util';

type StyleProps = {
    dropdown: boolean | number;
};

const SelectBtn = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 15px;
    color: ${(props: StyleProps) => (props.dropdown ? '#414042' : '#fff')};

    cursor: pointer;
    border: none;
    border-radius: 8px;
    margin-right: 11px;
    min-width: 180px;
    padding: 6px 9px;
    outline: none;
    box-shadow: 0px 11px 13px 0px rgba(0, 0, 0, 0.11);
    background-color: ${(props: StyleProps) => (props.dropdown ? '#fff' : '#97a3ff')};

    &:hover {
        background-color: ${(props: StyleProps) => (props.dropdown ? '#fff' : '#8d99f6')};
    }

    @media ${device.mobileXS} {
        min-width: 148px;
    }

    @media (max-width: 340px) {
        min-width: 129px;
    }
`;

const ActiveItem = styled.span`
    display: flex;
    font-weight: 500;
    letter-spacing: 0.4px;
    flex-grow: 1;
`;

const StyledIcon = styled(FaChevronDown)`
    transform: rotate(${(props: StyleProps) => (props.dropdown ? 180 : 0)}deg);
`;

const SelectList = styled.ul`
    list-style: none;
    width: 164px;
    margin-top: -6px;
    padding: 16px 8px 8px 8px;
    position: absolute;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    box-shadow: 0px 11px 13px 0px rgba(0, 0, 0, 0.11);
    background-color: ${(props) => props.theme.white};

    li {
        display: flex;
        align-items: center;
        border-radius: 8px;
        padding: 6px;
        transition: all 0.3s ease 0s;

        &:hover {
            background-color: ${(props) => props.theme.gray300};
        }

        button {
            cursor: pointer;
            font-size: 15.5px;
            background-color: transparent;
            margin-left: 7px;
            transition: all 0.3s ease 0s;

            &:hover {
                color: ${(props) => props.theme.primary};
            }
        }
    }

    @media ${device.mobileXS} {
        width: 132px;
    }

    @media (max-width: 340px) {
        width: 113px;
    }
`;

const ListLabel = styled.h5`
    font-size: 11px;
    letter-spacing: 1.1px;
    color: ${(props) => props.theme.gray400};
    text-transform: uppercase;
    margin-bottom: 6px;
`;

const ListItem = styled(Link)`
    font-size: 15px;
    text-decoration: none;
    color: ${(props) => props.theme.gray800};
    width: 100%;
    letter-spacing: 0.4px;
    font-weight: 500;
`;

export function ForumDropdown(): JSX.Element {
    const [dropdown, setDropdown] = useState(false);

    const node = useRef<HTMLDivElement>(null);
    const handleClick = (e: any) => {
        // Returns true if whatever you're clicking is inside the “node” ref.
        if (node.current!.contains(e.target)) return;
        setDropdown(false);
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    return (
        <div ref={node}>
            <SelectBtn onClick={() => setDropdown(!dropdown)} dropdown={dropdown}>
                <ActiveItem>Filler Text</ActiveItem>
                <StyledIcon dropdown={dropdown ? 1 : 0} />
            </SelectBtn>
            {dropdown && (
                <SelectList>
                    <ListLabel>Discussions</ListLabel>
                    <ListItem to='/'>
                        <li>
                            Filler Text
                            <button type='button'>
                                <FaRegStar />
                            </button>
                        </li>
                    </ListItem>
                </SelectList>
            )}
        </div>
    );
}
