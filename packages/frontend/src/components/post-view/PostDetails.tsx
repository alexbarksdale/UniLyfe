import React from 'react';
import styled from 'styled-components';
import { FaRegThumbsUp, FaRegEye } from 'react-icons/fa';

import { PostStats } from '../shared-styles/post.styles';

const PostDetailContainer = styled.div`
    div {
        h2 {
            font-weight: 600;
            color: ${(props) => props.theme.gray800};
        }

        p {
            font-size: 15px;
            font-weight: 500;
            margin: 9px 0px 15px 0px;
            color: ${(props) => props.theme.gray500};
        }
    }
`;

const PostDescription = styled.p`
    font-size: 16px;
    font-weight: 500;
    line-height: 20px;
    letter-spacing: 0.4px;
    color: ${(props) => props.theme.gray600};
    margin-bottom: 15px;
`;

const Divider = styled.hr`
    height: 2px;
    border: none;
    margin: 15px 0px;
    background-color: ${(props) => props.theme.divider};
`;

export function PostDetails(): JSX.Element {
    return (
        <PostDetailContainer>
            <div>
                <h2>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor.
                </h2>
                <p>Created by: XXX | User</p>
            </div>
            <PostDescription>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
                sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
                mollit anim id est laborum.
            </PostDescription>
            <PostStats postView>
                <li>
                    <button type='button'>
                        <FaRegThumbsUp />
                        100
                    </button>
                </li>
                <li>
                    <span>
                        <FaRegEye />
                        300
                    </span>
                </li>
            </PostStats>
            <Divider />
        </PostDetailContainer>
    );
}
