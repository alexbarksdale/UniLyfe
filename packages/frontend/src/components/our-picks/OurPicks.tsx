import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaCommentAlt } from 'react-icons/fa';

type StyleProps = {
    small?: boolean;
};

const PicksContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-areas: 'Main Main Second Second' 'Main Main Third Third' '. . . .';

    @media (max-width: 875px) {
        grid-template-areas: 'Main Main Main Main' 'Second Second Second Second' 'Third Third Third Third';
    }
`;

const MainItem = styled.div`
    height: 100%;
    grid-area: Main;
    margin-right: 16px;
    border-radius: 13px;

    @media (max-width: 875px) {
        margin-right: 0px;
        margin-bottom: 16px;
    }
`;

const SmallContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
`;

const SecondItem = styled.div`
    display: flex;
    height: 152px;
    grid-area: Second;
    margin-bottom: 16px;
`;
const ThirdItem = styled.div`
    display: flex;
    height: 152px;
    grid-area: Third;
`;

const PostHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 115px;
    padding: 15px;
    border-radius: 8px;
    background-color: ${(props) => props.theme.gray300};
    margin-right: ${(props: StyleProps) => (props.small ? '15px' : undefined)};
    width: ${(props: StyleProps) => (props.small ? '113px' : undefined)};
    margin-bottom: ${(props: StyleProps) => (props.small ? undefined : '15px')};
    svg {
        color: ${(props) => props.theme.gray500};
        font-size: 45px;
    }

    &:hover {
        opacity: 0.8;
    }
`;
const PostContent = styled.div`
    display: flex;
    flex-direction: column;

    a {
        text-decoration: none;
        &:hover {
            opacity: 0.8;
        }
    }

    h1 {
        font-size: 21px;
        color: ${(props) => props.theme.gray800};
    }

    p {
        color: ${(props) => props.theme.gray500};
        margin-bottom: 11px;
    }
`;

const PostInfoBar = styled.div`
    display: flex;
    font-size: 14px;

    p {
        color: ${(props) => props.theme.gray400};
    }
`;

const CategoryLink = styled(Link)`
    font-weight: 500;
    color: ${(props) => props.theme.primary};
    margin-bottom: 5px;
    text-decoration: none;

    &:hover {
        opacity: 0.8;
        text-decoration: underline;
    }
`;

const UserLink = styled(Link)`
    flex: 1;
    text-decoration: none;
    color: ${(props) => props.theme.gray600};

    &:hover {
        opacity: 0.8;
        text-decoration: underline;
    }
`;

export function OurPicks(): JSX.Element {
    return (
        <PicksContainer>
            <MainItem>
                <Link to='/'>
                    <PostHeader>
                        <FaCommentAlt />
                    </PostHeader>
                </Link>
                <PostContent>
                    <CategoryLink to='/'>Category</CategoryLink>
                    <Link to='/'>
                        <h1>Filler title</h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                            do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </p>
                    </Link>
                </PostContent>
                <PostInfoBar>
                    <UserLink to='/'>XXX | User</UserLink>
                    <p>June 20, 2020 0:00 AM</p>
                </PostInfoBar>
            </MainItem>
            <SecondItem>
                <Link to='/'>
                    <PostHeader small>
                        <FaCommentAlt />
                    </PostHeader>
                </Link>
                <SmallContainer>
                    <PostContent>
                        <CategoryLink to='/'>Category</CategoryLink>
                        <Link to='/'>
                            <h1>Filler title</h1>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna
                                aliqua.
                            </p>
                        </Link>
                    </PostContent>
                    <PostInfoBar>
                        <UserLink to='/'>XXX | User</UserLink>
                        <p>June 20, 2020 0:00 AM</p>
                    </PostInfoBar>
                </SmallContainer>
            </SecondItem>
            <ThirdItem>
                <Link to='/'>
                    <PostHeader small>
                        <FaCommentAlt />
                    </PostHeader>
                </Link>
                <SmallContainer>
                    <PostContent>
                        <CategoryLink to='/'>Category</CategoryLink>
                        <Link to='/'>
                            <h1>Filler title</h1>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                                sed do eiusmod tempor incididunt ut labore et dolore magna
                                aliqua.
                            </p>
                        </Link>
                    </PostContent>
                    <PostInfoBar>
                        <UserLink to='/'>XXX | User</UserLink>
                        <p>June 20, 2020 0:00 AM</p>
                    </PostInfoBar>
                </SmallContainer>
            </ThirdItem>
        </PicksContainer>
    );
}
