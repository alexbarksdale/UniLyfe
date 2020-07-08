import React from 'react';
import styled from 'styled-components';

import { Reply } from './comments/Reply';

const CommentsContainer = styled.div`
    margin-top: 15px;

    h3 {
        font-size: 17px;
        font-weight: 600;
        color: ${(props) => props.theme.gray800};
    }

    ul {
        margin-top: 15px;

        li {
            list-style: none;

            h5 {
                font-size: 15px;
                font-weight: 500;
                margin-bottom: 5px;
                color: ${(props) => props.theme.gray800};
            }
            span {
                font-weight: 500;
                font-size: 14px;
                color: ${(props) => props.theme.gray400};
            }
            p {
                margin-top: 7px;
                font-weight: 500;
                color: ${(props) => props.theme.gray500};
            }
        }
    }
`;

type AppProps = {
    isAuth: boolean;
};

// TODO: Figure out reply comment structure later
export function PostComments({ isAuth }: AppProps): JSX.Element {
    return (
        <CommentsContainer>
            <h3>1 Comment</h3>
            <ul>
                <li>
                    <Reply isAuth={isAuth} />
                </li>
            </ul>
        </CommentsContainer>
    );
}
