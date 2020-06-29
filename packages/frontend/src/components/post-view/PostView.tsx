import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaAngleLeft, FaRegThumbsUp, FaRegEye } from 'react-icons/fa';

import { Container, TwoOneGrid } from '../shared-styles/global.styles';
import { FixedFeed } from '../feed/fixed-feed/FixedFeed';
import { PostStats } from '../shared-styles/post.styles';

const BackButton = styled.button`
    font-size: 16px;
    background-color: transparent;
    margin-bottom: 17px;

    a {
        display: flex;
        font-weight: 500;
        text-decoration: none;
        color: ${(props) => props.theme.gray350};
        transition: all 0.3s ease 0s;

        &:hover {
            color: ${(props) => props.theme.error};
        }
    }
`;

// TODO: Remove if not needed
const PostContent = styled.div``;

const PostDetails = styled.div`
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
`;

const Divider = styled.hr`
    height: 2px;
    border: none;
    margin: 15px 0px;
    background-color: ${(props) => props.theme.divider};
`;

export function PostView(): JSX.Element {
    return (
        <Container>
            <TwoOneGrid>
                <PostContent>
                    <BackButton>
                        <Link to='/'>
                            <FaAngleLeft />
                            Back
                        </Link>
                    </BackButton>

                    <PostDetails>
                        <div>
                            <h2>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor.
                            </h2>
                            <p>Created by: XXX | User</p>
                        </div>
                        <PostDescription>
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco
                            laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                            irure dolor in reprehenderit in voluptate velit esse cillum
                            dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                            cupidatat non proident, sunt in culpa qui officia deserunt
                            mollit anim id est laborum.
                        </PostDescription>
                        <Divider />
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
                    </PostDetails>
                </PostContent>
                <FixedFeed />
            </TwoOneGrid>
        </Container>
    );
}
