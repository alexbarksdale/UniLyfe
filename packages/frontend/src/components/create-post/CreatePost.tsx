import React, { useState } from 'react';
import styled from 'styled-components';
import { FaCommentAlt, FaImage } from 'react-icons/fa';

import { CardContainer } from '../shared-styles/global.styles';
import { Theme } from '../../utils/theme.util';
import { TextPost } from './TextPost';

type StyleProps = {
    active?: boolean;
    onClick?: () => void;
    theme: Theme;
    dropdown?: boolean | number;
};

const CreateContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const CreateContent = styled.div`
    width: 400px;
    ${CardContainer};

    h2 {
        font-weight: 600;
        text-align: center;
        margin-bottom: 8px;
        color: ${(props) => props.theme.gray800};
    }

    p {
        text-align: center;
        letter-spacing: 0.2px;
        font-size: 15px;
        font-weight: 500;
        margin-bottom: 13px;
        color: ${(props) => props.theme.gray500};
    }
`;

const Selection = styled.ul`
    display: flex;
    justify-content: center;
    margin-bottom: 16px;

    li {
        list-style: none;
        margin-right: 8px;
    }
`;

const SelectionBtn = styled.button`
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    padding: 7px 13px;
    letter-spacing: 0.4px;
    outline: none;
    background-color: transparent;
    color: ${({ active, theme }: StyleProps) => (active ? theme.primary : theme.gray350)};
    border-bottom: 2px solid
        ${({ active, theme }: StyleProps) => (active ? theme.primary : theme.gray350)};

    svg {
        font-size: 14px;
        margin-right: 7px;
    }
`;

const Disabled = styled.div`
    pointer-events: none;
`;

export function CreatePost(): JSX.Element {
    const [active, setActive] = useState(true);

    return (
        <CreateContainer>
            <CreateContent>
                <h2>Create Post</h2>
                <p>Select what type of post you would like to create.</p>

                <Selection>
                    <li>
                        <SelectionBtn
                            type='button'
                            active={active}
                            onClick={() => setActive(true)}
                        >
                            <FaCommentAlt />
                            Text
                        </SelectionBtn>
                    </li>
                    <li>
                        <Disabled>
                            <SelectionBtn
                                type='button'
                                active={!active}
                                onClick={() => setActive(false)}
                            >
                                <FaImage />
                                Image
                            </SelectionBtn>
                        </Disabled>
                    </li>
                </Selection>

                <TextPost />
            </CreateContent>
        </CreateContainer>
    );
}
