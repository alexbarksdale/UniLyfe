import React, { useState } from 'react';
import styled from 'styled-components';

import { CreateComment } from './CreateComment';

const ReplyContent = styled.div`
    display: flex;
    flex-direction: column;

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
`;

const ReplyBtn = styled.button`
    display: flex;
    align-self: flex-end;
    margin-top: 9px;
    padding: 8px;

    font-size: 15px;
    font-weight: 500;
    color: ${(props) => props.theme.gray350};
    background-color: transparent;
    outline: none;
    transition: all 0.3s ease 0s;

    &:hover {
        color: ${(props) => props.theme.primary};
    }
`;

type AppProps = {
    isAuth: boolean;
};

export function Reply({ isAuth }: AppProps): JSX.Element {
    const [isReply, setReply] = useState(false);

    return (
        <ReplyContent>
            <h5>XXX | User</h5>
            <span>June 2, 2020</span>
            <p>
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
            </p>
            {isAuth ? (
                <>
                    <ReplyBtn type='button' onClick={() => setReply(!isReply)}>
                        Reply
                    </ReplyBtn>
                    {isReply ? <CreateComment isReply={isReply} /> : null}
                </>
            ) : null}
        </ReplyContent>
    );
}
