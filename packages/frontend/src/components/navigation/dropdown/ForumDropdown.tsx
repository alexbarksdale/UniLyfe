import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaChevronDown, FaRegStar } from 'react-icons/fa';

type StyleProps = {
    dropdown: boolean;
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
    transition: none !important;
    background-color: ${(props: StyleProps) => (props.dropdown ? '#fff' : '#97a3ff')};

    &:hover {
        background-color: ${(props: StyleProps) => (props.dropdown ? '#fff' : '#8d99f6')};
    }
`;

const ActiveItem = styled.span`
    display: flex;
    flex-grow: 1;
    transition: none !important;
`;

const StyledIcon = styled(FaChevronDown)`
    transform: rotate(${(props: StyleProps) => (props.dropdown ? 180 : 0)}deg);
    transition: none !important;
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

        &:hover {
            background-color: ${(props) => props.theme.gray300};
        }

        button {
            cursor: pointer;
            font-size: 15.5px;
            background-color: transparent;
            margin-left: 12px;

            &:hover {
                color: ${(props) => props.theme.primary};
                transition: none !important;
            }
        }
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
                <StyledIcon dropdown={dropdown} />
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
