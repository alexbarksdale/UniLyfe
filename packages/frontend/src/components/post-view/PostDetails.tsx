import React from 'react';
import styled from 'styled-components';
import { FaRegThumbsUp, FaRegEye } from 'react-icons/fa';

import { PostStats } from '../shared-styles/post.styles';
import { GetPostQuery } from '../../generated/graphql';

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

type AppProps = {
    postData: GetPostQuery;
};

export function PostDetails({ postData }: AppProps): JSX.Element {
    const { getPost } = postData;

    return (
        <PostDetailContainer>
            <div>
                <h2>{getPost.title}</h2>
                <p>Created by: XXX | {getPost.author.username}</p>
            </div>
            <PostDescription>{getPost.content}</PostDescription>
            <PostStats postView>
                <li>
                    <button type='button'>
                        <FaRegThumbsUp />
                        {getPost.likes}
                    </button>
                </li>
                <li>
                    <span>
                        <FaRegEye />
                        {getPost.views}
                    </span>
                </li>
            </PostStats>
            <Divider />
        </PostDetailContainer>
    );
}
