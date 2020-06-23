import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { CategoryTitle } from '../../../utils/globalStyles.util';

const NewsContainer = styled.div``;

const NewsHeader = styled.div`
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    background-blend-mode: hard-light;

    h1 {
        font-size: 20px;
        font-weight: 600;
        color: ${(props) => props.theme.gray800};
    }
`;

const NewsContent = styled.ul`
    li {
        list-style: none;

        a {
            text-decoration: none;
        }
    }
`;

const NewsCard = styled.div`
    border-radius: 8px;
    background-color: ${(props) => props.theme.white};

    img {
        height: 88px;
        width: 100%;
        margin-right: 9px;
        border: none;
        border-radius: 8px;
        object-fit: cover;
        background-color: ${(props) => props.theme.gray300};
    }

    h3 {
        font-size: 16px;
        font-weight: 600;
        color: ${(props) => props.theme.gray800};
    }

    a {
        color: ${(props) => props.theme.gray600};
        &:hover {
            opacity: 0.8;
        }
    }
`;

const SubHeader = styled.div`
    display: flex;
    align-items: center;
    margin: 8px 0px;

    p {
        font-size: 11px;
        border-radius: 30px;
        padding: 4px 10px;
        font-weight: 600;
        letter-spacing: 1px;
        color: ${(props) => props.theme.white};
        background-color: ${(props) => props.theme.error};
    }

    span {
        margin: 0px 5px;
        color: ${(props) => props.theme.gray350};
    }

    h4 {
        display: flex;
        font-size: 13px;
        font-weight: 500;
        color: ${(props) => props.theme.gray450};
    }
`;

export function NewsFeed(): JSX.Element {
    return (
        <NewsContainer>
            <NewsHeader>
                <CategoryTitle>News</CategoryTitle>
            </NewsHeader>
            <NewsContent>
                <li>
                    <NewsCard>
                        <Link to='/'>
                            <img
                                src='https://techcrunch.com/wp-content/uploads/2020/06/GettyImages-128073063.jpg?w=602'
                                alt='TODO'
                            />
                        </Link>
                        <div>
                            <SubHeader>
                                <p>NBC</p>
                                <span>•</span>
                                <h4>June 20, 2020</h4>
                            </SubHeader>
                            <h3>
                                <Link to='/'>
                                    Across the country, university campuses are in limbo.
                                </Link>
                            </h3>
                        </div>
                    </NewsCard>
                </li>
            </NewsContent>
        </NewsContainer>
    );
}
