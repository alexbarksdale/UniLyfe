import React from 'react';
import styled from 'styled-components';

import { CategoryTitle } from '../../shared-styles/global.styles';
import { useGetNewsQuery, NewsArticle } from '../../../generated/graphql';

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
        margin-bottom: 12px;

        a {
            text-decoration: none;
            transition: all 0.3s ease 0s;
        }
    }
`;

const NewsCard = styled.div`
    border-radius: 8px;
    background-color: ${(props) => props.theme.white};
    transition: all 0.3s ease 0s;

    img {
        height: 105px;
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
    align-items: baseline;
    margin: 8px 0px;

    p {
        font-size: 11px;
        border-radius: 30px;
        padding: 4px 10px;
        font-weight: 600;
        letter-spacing: 1px;
        color: ${(props) => props.theme.white};
        background-color: #ff9090;
    }

    span {
        margin: 0px 5px;
        color: ${(props) => props.theme.gray350};
    }

    h4 {
        font-size: 13px;
        font-weight: 500;
        color: ${(props) => props.theme.gray450};
    }
`;

export function NewsFeed(): JSX.Element | null {
    const { data, loading } = useGetNewsQuery();

    if (loading || !data || typeof data.getNews === 'undefined') return null;

    const renderNews = (data: NewsArticle[]) => {
        return data.map((item) => {
            const rawDate = new Date(item.publishedAt);

            const options = {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            };
            const date = rawDate.toLocaleDateString('en-us', options);
            return (
                <li key={item.title}>
                    <NewsCard>
                        <a href={`${item.url}`} rel='noopener noreferrer' target='_blank'>
                            <img src={`${item.urlToImage}`} alt={`${item.urlToImage}`} />
                        </a>
                        <div>
                            <SubHeader>
                                <p>{item.source.name}</p>
                                <span>•</span>
                                <h4>{date}</h4>
                            </SubHeader>
                            <h3>
                                <a
                                    href={`${item.url}`}
                                    rel='noopener noreferrer'
                                    target='_blank'
                                >
                                    {item.title}
                                </a>
                            </h3>
                        </div>
                    </NewsCard>
                </li>
            );
        });
    };

    return (
        <NewsContainer>
            <NewsHeader>
                <CategoryTitle>News</CategoryTitle>
            </NewsHeader>
            <NewsContent>{renderNews(data.getNews.articles)}</NewsContent>
        </NewsContainer>
    );
}
