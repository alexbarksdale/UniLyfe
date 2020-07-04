import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaAngleLeft } from 'react-icons/fa';

import { Container, TwoOneGrid } from '../shared-styles/global.styles';
import { FixedFeed } from '../feeds/fixed-feed/FixedFeed';
import { PostDetails } from './PostDetails';
import { CreateComment } from './comments/CreateComment';
import { PostComments } from './PostComments';

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

// TODO: Don't show PostComment if not auth
export function PostView(): JSX.Element {
    return (
        <Container>
            <TwoOneGrid>
                <div>
                    <BackButton>
                        <Link to='/'>
                            <FaAngleLeft />
                            Back
                        </Link>
                    </BackButton>

                    <PostDetails />
                    <CreateComment />
                    <PostComments />
                </div>
                <FixedFeed />
            </TwoOneGrid>
        </Container>
    );
}

