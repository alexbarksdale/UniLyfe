import React from 'react';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FaAngleLeft } from 'react-icons/fa';

import { Container, TwoOneGrid } from '../shared-styles/global.styles';
import { FixedFeed } from '../feeds/fixed-feed/FixedFeed';
import { PostDetails } from './PostDetails';
import { CreateComment } from './comments/CreateComment';
import { PostComments } from './PostComments';
import { useGetPostQuery } from '../../generated/graphql';

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
export function PostView(): JSX.Element | null {
    const { id } = useParams();
    const { data, loading } = useGetPostQuery({
        variables: {
            postId: parseInt(id, 10),
        },
    });

    if (loading || typeof data === 'undefined') return null;

    // TODO: Create a state for current category and use that for back button url
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

                    <PostDetails postData={data} />
                    <CreateComment />
                    <PostComments />
                </div>
                <FixedFeed />
            </TwoOneGrid>
        </Container>
    );
}

