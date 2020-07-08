import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { FaAngleLeft } from 'react-icons/fa';

import { Container, TwoOneGrid } from '../shared-styles/global.styles';
import { FixedFeed } from '../feeds/fixed-feed/FixedFeed';
import { PostDetails } from './PostDetails';
import { CreateComment } from './comments/CreateComment';
import { PostComments } from './PostComments';
import { useGetPostQuery, useMeQuery } from '../../generated/graphql';
import { StoreState } from '../../store/reducers/main.reducer';

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

const NoAuthComment = styled.div`
    margin: 24px 0px;
    h3 {
        font-size: 18px;
        font-weight: 600;
        color: ${(props) => props.theme.gray600};

        a {
            text-decoration: none;
            color: ${(props) => props.theme.primary};
            transition: all 0.3s ease 0s;

            &:hover {
                opacity: 0.8;
            }
        }
    }
`;

export function PostView(): JSX.Element | null {
    const { unilyfe, forum } = useSelector(
        (state: StoreState) => state.navigationReducer.category
    );

    const { data: meData } = useMeQuery();
    const { id } = useParams();
    const { data: postData, loading } = useGetPostQuery({
        variables: {
            postId: parseInt(id, 10),
        },
    });

    if (loading || typeof postData === 'undefined') return null;

    const isAuth: boolean = !!(meData && meData.me);

    let backBtnLink = '';
    if (unilyfe) backBtnLink = `/${unilyfe}`;
    if (forum) backBtnLink = `/category/${forum}`;

    return (
        <Container>
            <TwoOneGrid>
                <div>
                    <BackButton>
                        <Link to={backBtnLink}>
                            <FaAngleLeft />
                            Back
                        </Link>
                    </BackButton>

                    <PostDetails postData={postData} />
                    {isAuth ? (
                        <CreateComment />
                    ) : (
                        <NoAuthComment>
                            <h3>
                                <Link to='/login'>Log in </Link>
                                to leave a comment.
                            </h3>
                        </NoAuthComment>
                    )}
                    <PostComments isAuth={isAuth} />
                </div>
                <FixedFeed />
            </TwoOneGrid>
        </Container>
    );
}
