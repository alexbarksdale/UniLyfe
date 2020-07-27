import React from 'react';
import styled from 'styled-components';
import { FaCalendarAlt } from 'react-icons/fa';

import { Container, CategoryTitle } from '../../shared-styles/global.styles';
import { useGetUniNewsQuery } from '../../../generated/graphql';
import { device, Theme } from '../../../utils/theme.util';

// MESSSAGE:
// I tried my best to keep this component as DRY as possible without
// going insane over the grid situtation and the small differences between them.
// Iterating over the news data would be slightly more annoying because of the different
// CSS properties some grids have and not to mention figuring out what iteration of the article
// goes in what grid, etc etc.This works perfectly fine.

type StyleProps = {
    theme: Theme;
    bgUrl: string;
};

const GNContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    gap: 10px 10px;
    grid-template-areas: 'Secondary Main Main Third' 'Secondary Main Main Fourth' '. . . .';

    @media ${device.tabletL} {
        gap: 0px;
        grid-template-areas: 'Main Main Secondary Secondary' 'Third Third Fourth Fourth' '. . . .';
    }
`;

const ItemStyles = `
    background-color: ${(props: StyleProps) => props.theme.gray200};
    background-position: center;
    background-size: cover;
    transition: all .3s ease 0s;

    a {
        text-decoration: none;
    }

    &:hover {
        transform: scale(1.05);
        box-shadow: 0px 0px 32px rgba(0,0,0,0.2);
    }
`;

const MainItem = styled.div`
    grid-area: Main;
    padding: 14px;
    background-image: linear-gradient(
            356deg,
            rgba(146, 66, 242, 0.7) 0%,
            rgba(255, 214, 117, 0.7) 100%
        ),
        url(${({ bgUrl }: StyleProps) => bgUrl});
    ${ItemStyles}


    @media ${device.tabletL} {
        font-size: 12px;
        height: 200px;
    }
`;

const SecondaryItem = styled.div`
    grid-area: Secondary;
    padding: 14px;
    background-image:
        linear-gradient(356deg, rgba(242,66,66,0.7) 0%, rgba(117,176,255,0.7) 100%),
        url(${({ bgUrl }: StyleProps) => bgUrl});
    ${ItemStyles}

    @media ${device.tabletL} {
        font-size: 12px;
    }
`;

const ThirdItem = styled.div`
    grid-area: Third;
    padding: 14px;
    font-size: 12px;
    background-image: linear-gradient(
            356deg,
            rgba(242, 66, 66, 0.7) 0%,
            rgba(255, 117, 235, 0.7) 100%
        ),
        url(${({ bgUrl }: StyleProps) => bgUrl});
    ${ItemStyles}
`;

const FourthItem = styled.div`
    grid-area: Fourth;
    padding: 14px;
    font-size: 12px;
    background-image: linear-gradient(
            356deg,
            rgb(25 184 102 / 60%) 0%,
            rgb(157 117 255 / 70%) 100%
        ),
        url(${({ bgUrl }: StyleProps) => bgUrl});
    ${ItemStyles}
`;

const NewsContent = styled.div`
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    height: 100%;
`;

const NewsTag = styled.p`
    font-size: 13px;
    margin-bottom: 5px;
    padding: 4px 10px;
    border-radius: 8px;
    opacity: 0.8;
    border: 1.5px solid ${(props) => props.theme.white};
    color: ${(props) => props.theme.white};
`;

const NewsTitle = styled.h1`
    font-weight: 600;
    color: ${(props) => props.theme.white};
`;

export const NewsDate = styled.p`
    display: flex;
    font-size: 13px;
    font-family: 'SFMono', Arial, Helvetica, sans-serif !important;
    letter-spacing: -0.5px;
    color: ${(props) => props.theme.gray300};

    svg {
        margin-right: 8px;
    }
`;

// WARNING: If you changed the page size in the news request (on the back-end server)
// this component will break! It is currently expecting at least four articles. I will
// probably fix this in the future. Read the message at the top as to
// why this component is scuffed.

// TODO: Maybe refactor this in the future...
export function UniNews(): JSX.Element | null {
    const { data, loading } = useGetUniNewsQuery();

    if (loading || !data || typeof data.getUniNews === 'undefined') return null;

    const formatDate = (articleDate: string): string => {
        const rawDate = new Date(articleDate);
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        };
        return rawDate.toLocaleDateString('en-us', options);
    };

    const main = data.getUniNews.articles[0];
    const second = data.getUniNews.articles[1];
    const third = data.getUniNews.articles[2];
    const fourth = data.getUniNews.articles[3];

    return (
        <>
            <Container>
                <CategoryTitle>University News</CategoryTitle>
            </Container>
            <GNContainer>
                <MainItem bgUrl={main.urlToImage}>
                    <a href={main.url} rel='noopener noreferrer' target='_blank'>
                        <NewsContent>
                            <NewsTag>{main.source.name}</NewsTag>
                            <NewsTitle>{main.title}</NewsTitle>
                            <NewsDate>
                                <FaCalendarAlt />
                                {formatDate(main.publishedAt)}
                            </NewsDate>
                        </NewsContent>
                    </a>
                </MainItem>
                <SecondaryItem bgUrl={second.urlToImage}>
                    <a href={second.url} rel='noopener noreferrer' target='_blank'>
                        <NewsContent>
                            <NewsTag>{second.source.name}</NewsTag>
                            <NewsTitle>{second.title}</NewsTitle>
                            <NewsDate>
                                <FaCalendarAlt />
                                {formatDate(second.publishedAt)}
                            </NewsDate>
                        </NewsContent>
                    </a>
                </SecondaryItem>
                <ThirdItem bgUrl={third.urlToImage}>
                    <a href={third.url} rel='noopener noreferrer' target='_blank'>
                        <NewsContent>
                            <NewsTag>{third.source.name}</NewsTag>
                            <NewsTitle>{third.title}</NewsTitle>
                            <NewsDate>
                                <FaCalendarAlt />
                                {formatDate(third.publishedAt)}
                            </NewsDate>
                        </NewsContent>
                    </a>
                </ThirdItem>
                <FourthItem bgUrl={fourth.urlToImage}>
                    <a href={fourth.url} rel='noopener noreferrer' target='_blank'>
                        <NewsContent>
                            <NewsTag>{fourth.source.name}</NewsTag>
                            <NewsTitle>{fourth.title}</NewsTitle>
                            <NewsDate>
                                <FaCalendarAlt />
                                {formatDate(fourth.publishedAt)}
                            </NewsDate>
                        </NewsContent>
                    </a>
                </FourthItem>
            </GNContainer>
        </>
    );
}
